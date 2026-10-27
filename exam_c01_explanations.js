// Plain-English explanations for the original MLA-C01 question bank (questions 1-145).
// The answer key is community-sourced. C01_DOC_NOTES records answers checked against AWS documentation;
// C01_CAUTION lists questions whose keyed answer is flawed or comes with a caveat.
const C01_EXPLANATIONS = {
 "1": "A central model registry that keeps every model version organized → SageMaker Model Registry with model groups. A model group is a folder holding every version of one model. ECR repositories store containers, not versioned model records. Unique tags inside the registry still skip the built-in grouping.",
 "2": "Back-to-back training jobs that waste time starting up → managed warm pools, which keep the training instances warm after a job ends so the next job starts right away. Spot training saves money but can make startup slower. Training Compiler speeds up the math inside a job. Data parallelism splits training across GPUs. None of those three fixes the startup wait.",
 "3": "Only approved models may reach production → Model Registry approval status inside a SageMaker AI pipeline. A model version waits as pending until someone changes it to Approved. Experiments track training runs, Lineage Tracking records history, and Model Monitor watches live endpoints. None of those has an approval gate.",
 "4": "Check for bias drift on demand for models already on real-time endpoints → a Lambda function that starts a SageMaker Clarify job. Clarify is the fairness inspector, and Lambda lets you run it whenever you want. Glue Data Quality checks data values, not bias. Comparing in notebooks by hand isn't a workflow. (AWS has since closed Clarify to new customers. Existing customers can still use it.)",
 "5": "Ordering question: unlabeled, partly empty CSV files → (1) a Glue crawler to infer the schema and columns, (2) Glue DataBrew to clean the data and engineer features, (3) store the result back in S3. Find out what you have first, then clean it, then save it.",
 "6": "Ordering question for Feature Store → (1) create a feature group (the empty shelf), (2) ingest the records (fill the shelf), (3) use the store to build training datasets (take ingredients off the shelf).",
 "7": "Ordering question: retrain automatically when new data arrives → (1) an S3 event notification starts the pipeline when data is uploaded, (2) SageMaker AI retrains the model on the new data, (3) the pipeline deploys the model to an endpoint. Doorbell, then cook, then serve.",
 "8": "Matching question on generative AI terms. Token = a basic unit of text the model processes. Embedding = a list of numbers that captures meaning. RAG = adding facts from outside sources to improve an answer. Temperature isn't used here. It's the randomness dial.",
 "9": "Matching question on feature engineering. City name (no order) → one-hot encoding. A field holding two facts (type plus year) → feature splitting. Building size, which is skewed by a few huge homes → log transformation.",
 "10": "Bring data from several sources together into one governed place → AWS Lake Formation, which builds and manages a data lake. EMR Spark jobs could combine the data but mean building it yourself. Kinesis is for streaming. DynamoDB is a database, not a way to combine sources.",
 "11": "Find anomalies in prepared data automatically and visualize them → SageMaker Data Wrangler, which has built-in data quality and insights reports with charts. Athena and Redshift Spectrum query data but don't detect anomalies on their own. AWS Batch just runs jobs.",
 "12": "Turn categories into numbers with the least overhead → Data Wrangler's built-in encoding transforms. Models need numbers, so categories become numbers, not the other way around. Glue works but takes more code.",
 "13": "Class imbalance with the least effort → Data Wrangler's balance data operation, which oversamples the minority class. Athena only analyzes the data. Studio Classic built-in algorithms don't balance data. DataBrew has no built-in oversampling step for this.",
 "14": "Tabular data with interacting features, where the model misses patterns → LightGBM, a gradient-boosted tree algorithm that captures interactions between features. Linear learner assumes straight-line relationships. K-means groups unlabeled data. NTM is for topics in text.",
 "15": "F1 was stable, then fell after months with nothing changed in the model → concept drift. The real-world relationship the model learned has changed. An undersized model or a bad baseline would have shown problems from the start, not months later.",
 "16": "Manage notebook permissions in one place → one IAM role with the needed permissions, attached to every notebook instance. Notebooks run as roles, not as users or groups. Admin access breaks least privilege.",
 "17": "Predicting a price (a number) → MAE (mean absolute error). Accuracy, AUC and F1 are for classification, not number predictions.",
 "18": "Loss goes up and down in a repeating cycle and never settles → the learning rate is too high, so the model keeps overshooting. Lower it. Early stopping halts training but doesn't fix the cause. A bigger test set changes nothing about training. A higher learning rate makes it worse.",
 "19": "Query CSV data by transaction date with the least overhead → an Athena CREATE TABLE AS SELECT (CTAS) statement, which writes a new table organized by date with a single SQL statement. Separate buckets plus replication, Glue Spark or Firehose all add pipelines to maintain.",
 "20": "Find duplicate records that aren't exact copies, with the least code → the AWS Glue FindMatches transform, which uses ML to match near-duplicates. Mechanical Turk is manual human work. QuickSight ML Insights isn't for deduplication. Data Wrangler's drop duplicates only removes exact copies.",
 "21": "Weekend batch job that can handle interruptions → Spot Instances, spare capacity at a large discount that AWS can reclaim. Reserved Instances suit always-on workloads. On-Demand and Dedicated cost more.",
 "22": "Copy an Amazon Comprehend custom model to another account → a resource-based policy on the model, then the ImportModel API in the other account. Comprehend has built-in cross-account import. S3 copies, DataSync and VPNs don't move a Comprehend model.",
 "23": "Validation performance improves, then gets worse → overfitting. Fix it with early stopping and more dropout. More layers or neurons make the model memorize even more. Bias in the data is a different problem.",
 "24": "Semantic search over documents already in S3 → Amazon Kendra with its S3 connector, managed search that understands meaning. Building your own embeddings with Batch or notebooks takes more work. Textract pulls text out of scans but doesn't search it.",
 "25": "Find out quickly whether a dataset can predict a target → SageMaker Autopilot, which tries many models automatically and reports how well they do. Custom scripts take far more work. Macie finds sensitive data. A Bedrock LLM isn't a tabular prediction tool.",
 "26": "Colors with no natural order, going into a neural network → one-hot encoding. Label encoding invents a fake order. Padding is for sequences. Dimensionality reduction shrinks features but doesn't encode them.",
 "27": "Find and remove sensitive data in S3 for a model that runs on premises → Macie to find it and Lambda functions to remove it. Macie only finds sensitive data, so something else has to remove it. Moving the model to SageMaker AI or ECS isn't required. Comprehend plus EC2 means managing servers.",
 "28": "Data ingestion pipelines and model deployment pipelines → AWS Glue for ingestion and SageMaker Studio pipelines for deployment. Firehose is for streaming. Redshift ML builds models in SQL. Athena only runs queries.",
 "29": "Organize existing model groups by team without changing them → Model Registry collections, a folder layer above model groups that leaves the groups untouched. Moving models into new groups changes their existing groupings, which the question rules out. Tags help search but aren't the registry's organizing feature. Lineage Tracking records history.",
 "30": "Block one specific IP address → a deny rule in the subnet's network ACL. Security groups only allow traffic and can't deny. Route tables can't deny traffic. Shadow variants are for model testing.",
 "31": "Summarize Spanish audio, video and text as fast as possible → Transcribe (speech to text), Translate (Spanish to English), then a Bedrock LLM to summarize. Rekognition handles images, not speech. Comprehend analyzes text but doesn't transcribe audio. Training your own model is the slowest option.",
 "32": "Real-time anomaly detection on thousands of records per second, least overhead → Kinesis Data Streams plus the built-in RANDOM_CUT_FOREST function in Managed Service for Apache Flink. Self-managed Kafka on EC2 is more work. SQS FIFO has limited throughput and no analytics.",
 "33": "Quick sentiment analysis of chat text → Amazon Comprehend, ready-made sentiment analysis. Rekognition is for images. Naive Bayes and random forests require building and training your own model.",
 "34": "Make answers more consistent → lower both temperature and top_k. Both control randomness in word choice, so turning both down makes answers more predictable.",
 "35": "Minimize false positives → raise the precision target, so the model only says 'weed present' when it's very sure. See the documentation check below: this question is flawed as written.",
 "36": "Sub-second latency through Firehose → zero buffering on the Firehose stream, plus a tuned PutRecordBatch batch size. Firehose waits to fill a buffer, so a 60-second buffer means up to 60 seconds of delay. A longer buffer makes it worse. DataSync and SQS aren't real-time delivery to OpenSearch.",
 "37": "Highly available, low latency, unpredictable bursts, scaling with demand → a SageMaker AI real-time endpoint with auto scaling. ECS or EKS means managing more yourself. A Spot fleet can be interrupted, which a production endpoint can't afford.",
 "38": "EMR batch processing where losing data is unacceptable, most cost-effective → primary and core nodes On-Demand, task nodes on Spot. Core nodes store data in HDFS, so losing one loses data. Task nodes only compute, so Spot interruptions are safe there.",
 "39": "Reduce energy and compute for training → SageMaker Debugger rules that stop jobs that aren't converging, and AWS Trainium instances, which are built for efficient training. Ground Truth is for labeling. Lambda deployment and distributed training don't reduce training energy.",
 "40": "Several automated processing steps that can run for hours → SageMaker AI Pipelines, triggered by EventBridge. Lambda has a 15-minute limit. Notebooks and Data Wrangler steps aren't automated multi-step pipelines.",
 "41": "Declare a model for a SageMaker AI endpoint in CloudFormation → the AWS::SageMaker::Model resource. The endpoint resource needs a model (and an endpoint configuration) to exist first, so the model is the thing to declare.",
 "42": "Engineers can access only their own campaigns' data, through Athena and S3 → Lake Formation tag-based access control (LF-Tags) that maps engineers to campaigns. IAM policies on the Glue catalog, DynamoDB lookups and bucket policies are more work and harder to manage at scale.",
 "43": "File format that minimizes processing time for complex data in Canvas → Apache Parquet, a columnar and compressed format that reads efficiently. Compressed CSV and JSON are still row-based text formats.",
 "44": "False negatives cost far more than false positives → choose the model with high recall, which catches as many real positives as possible.",
 "45": "Record and monitor every endpoint API call, with notification at a threshold → CloudTrail logs the API events, a CloudWatch dashboard shows them, and a CloudWatch alarm sends the alert. Debugger is for training, not API auditing.",
 "46": "Glue jobs inside SageMaker AI Pipelines with the least overhead → Callback steps, which start the Glue workflow and pause the pipeline until it reports back. Step Functions or EventBridge add a separate orchestration layer. Processing steps don't run Glue jobs.",
 "47": "Give access to sensitive Redshift data without changing the source or storing masked copies → dynamic data masking at query time. A materialized view stores masked data. Unloading to S3 creates copies. A Glue job transforms the data.",
 "48": "Find vanishing gradients, underused GPUs and overfitting during training, and react automatically → SageMaker Debugger built-in rules with actions. TensorBoard and CloudWatch show metrics but don't react on their own.",
 "49": "Test a new model on live data without affecting users → shadow testing. The shadow variant receives copies of real requests, but users only ever see the current model's answers. Blue/green deployments send real users to the new model.",
 "50": "Fast Athena queries on the last 3 days, then archive after 30 days → partition the data by date in S3, and use lifecycle rules to move old partitions to Glacier. Partitions let Athena skip the days it doesn't need. Separate buckets per day or Lambda copies add complexity.",
 "51": "Reduce delays from asynchronous inference and get alerts on quality → switch to real-time inference and use Model Monitor for model quality alerts. Async inference queues requests, which causes the delay. Batch is even slower.",
 "52": "Inconsistent traffic, low cost when idle, but must handle peaks → a SageMaker AI endpoint with auto scaling on CloudWatch metrics. Lambda with fixed concurrency can't scale up for peaks. Running multiple fixed copies wastes money when idle.",
 "53": "Alert when SageMaker AI compute costs reach a threshold → tag resources through the SageMaker domain user profile and use AWS Budgets alerts. Tagging at the domain level catches the resources those users create.",
 "54": "Drop unneeded columns from a 50 MB Parquet file with the least effort → a Data Wrangler flow with a drop columns transform. Point-and-click is less work than local scripts, Spark jobs or processing jobs.",
 "55": "Keep a competitor's name out of Amazon Q Business responses → a blocked phrase in Q Business's built-in content controls. Retrievers and boosting affect which documents are found, not which words appear in the answer.",
 "56": "Fine-tune an LLM for summarization with a low-code, no-code approach → SageMaker Autopilot fine-tuning a JumpStart foundation model. Studio with EC2 or custom containers means writing code.",
 "57": "A once-a-night job, under a minute, small input → a serverless inference endpoint with MaxConcurrency set to 1. You pay only for that minute each night. A real-time endpoint pays all day. Async needs instances running. A multi-model endpoint isn't relevant.",
 "58": "Production images vary in quality (camera noise), fix fast → recreate the training set using Data Wrangler's corrupt image transform with impulse noise, so the model learns to handle noisy images. Collecting new images is slow. Enhancing or resizing doesn't teach the model to handle noise.",
 "59": "Rotate API tokens automatically every 3 months → Secrets Manager with a rotation Lambda function. Parameter Store has no built-in rotation. KMS stores encryption keys, not API tokens.",
 "60": "Combine messy datasets (missing values, duplicates, outliers) and prepare them → Data Wrangler, which joins datasets and has built-in cleaning transforms. Ground Truth is for labeling. Manual merging is more work.",
 "61": "Predict yes or no (needs long-term support or not) → logistic regression, a classification method. Linear regression predicts numbers. Anomaly detection finds unusual records. Semantic segmentation labels image pixels.",
 "62": "Share an externally built model with a Canvas user in the same domain → the Canvas user needs access to the S3 bucket with the artifacts, and the model must be registered in Model Registry, which is how models are shared to Canvas. Separate domains, Marketplace and endpoints aren't required.",
 "63": "Fastest hyperparameter tuning for a deep learning model on large data → Hyperband, which stops weak trials early and gives more resources to promising ones. Grid search tries everything. Bayesian and random don't cut weak runs early.",
 "64": "Redshift ML in one account reading S3 in another account, with no public IP addresses → an S3 gateway endpoint, a bucket policy that allows the primary account, and interface endpoints for SageMaker and Redshift. Peering, Direct Connect and VPN are heavier and still need S3 access set up.",
 "65": "Email when metrics breach a threshold → log the metrics to CloudWatch and use a CloudWatch alarm (with SNS) to send the email. CloudTrail records API calls, not metrics. CloudFront is a content delivery network.",
 "66": "Model Monitor flags data quality issues right after a model update → create a new baseline from the latest dataset. The old baseline described the old model's data, so every new run looks like a violation. Changing hyperparameters or adding data doesn't fix an outdated baseline.",
 "67": "Images up to 50 MB, scaling with demand, least overhead → Asynchronous Inference with a scaling policy, which handles big payloads and can scale down when quiet. Batch transform runs whole jobs, not ongoing requests. EKS and Batch on ECS are more to manage.",
 "68": "Extract keywords from documents with the least overhead → Amazon Comprehend key phrase extraction, plus custom entity recognition where needed. NLTK on EC2, BlazingText and Lambda functions are all do-it-yourself.",
 "69": "Engineers may only access their own group's training data in S3 → IAM policies attached to their users or roles. Versioning, Object Lock and CORS don't control who can read data.",
 "70": "Predictable, sustained traffic in a daily 2-hour window, fast responses, AWS manages scaling → Serverless Inference with provisioned concurrency, which keeps it warm during the known busy window. Batch, EC2 Auto Scaling and EKS mean managing more yourself.",
 "71": "Explain how a model makes predictions → SageMaker Clarify feature attributions (SHAP). Model Monitor watches drift. A/B results and shadow comparisons don't explain the model's reasoning. (Clarify is closed to new customers. Existing customers can still use it.)",
 "72": "Reduce communication overhead in distributed training → keep the instances together in one subnet, with the data in the same Region and Availability Zone. Spreading instances across zones or Regions adds network distance.",
 "73": "Move existing PyTorch scripts to AWS with the least effort → SageMaker script mode with the prebuilt framework containers. Your script runs nearly unchanged. Built-in algorithms would replace the custom model. Building your own container is more work. Marketplace models aren't yours.",
 "74": "Millions of small files, improve training performance fast → FSx for Lustre linked to the S3 bucket, a high-performance file system that loads lazily from S3. EFS needs a full copy. ElastiCache isn't training storage. (S3 Express One Zone could also help, but it means moving the data to a new kind of bucket.)",
 "75": "Mask sensitive data while keeping meaningful ordered features → AWS Glue DataBrew, which has masking transforms that keep the data useful. Macie only finds the data. Random values in Batch or EMR destroy the meaning of ordered features.",
 "76": "Large datasets processed asynchronously, plus scheduled data quality monitoring with alerts → batch transform for the inferences and Model Monitor for data quality alerts. Glue, Batch and ECS jobs aren't ML inference services, and CloudTrail doesn't measure data quality.",
 "77": "Normalize production data the same way as training data → reuse the min and max from the training set. If you recompute them on new data, the same raw value turns into a different number and the model gets confused. A well-known dataset's statistics don't match your data.",
 "78": "Training data lives on FSx for NetApp ONTAP in the same VPC → mount the FSx file system as a volume on the SageMaker AI instance. Mountpoint for S3 and Data Wrangler connections add steps that aren't needed.",
 "79": "Retrain when new data lands in S3, least effort → an EventBridge rule that matches the S3 upload and targets the pipeline. A Lambda function scanning the bucket and an MWAA setup are more work. Lifecycle rules move storage classes and don't start pipelines.",
 "80": "Great at spotting fraud in training data, poor on new transactions → overfitting. Decrease max_depth so the trees are simpler. Increasing max_depth makes overfitting worse. A higher learning rate doesn't fix memorization.",
 "81": "Maximize correct predictions of both positive and negative labels → accuracy, which counts every correct answer of both kinds. Precision and recall focus on positives. Specificity focuses on negatives.",
 "82": "Orchestrate SageMaker AI jobs as a visual graph (DAG), keep experiment history, and support audits → SageMaker AI Pipelines in Studio plus ML Lineage Tracking. CodePipeline isn't built to show ML workflows as graphs. Lineage Tracking gives the audit trail.",
 "83": "Find inefficiently used instances and volumes and get recommendations, least effort → AWS Compute Optimizer. Writing your own code, cost tags and CloudTrail history don't produce rightsizing recommendations.",
 "84": "One central catalog for models spread across accounts → Model Registry model groups with cross-account resource policies, plus a central account whose registry is the catalog. ECR replication copies containers but doesn't catalog models. The Glue Data Catalog is for data tables.",
 "85": "Validate a new model online on 10% of traffic, least overhead → add it as a production variant on the existing endpoint with weight 0.1. A new endpoint, or routing at the load balancer, means more setup.",
 "86": "Find an item in an image and where it is → object detection, which returns a label plus a bounding box. Image classification only labels the whole image. XGBoost and k-NN aren't image models.",
 "87": "Mixed file types in one folder, processed by DataBrew, output for Glue → separate the files into a folder per type, process each folder, and save as Parquet. A DataBrew dataset expects one format. Parquet is a good format for Glue to read later.",
 "88": "Pass/fail classifier → precision and recall, and accuracy and F1. These are classification metrics. RMSE and MAPE are for numbers. BLEU is for translation. Perplexity is for language models.",
 "89": "Encrypt data in transit between training nodes → enable inter-node (inter-container) traffic encryption for the training cluster. KMS keys on the job or domain encrypt stored data, not traffic between nodes. Batch processing nodes aren't the training cluster.",
 "90": "Metrics for a time-series forecast → RMSE and weighted quantile loss (wQL). Recall and LogLoss are for classification. InferenceLatency measures speed, not accuracy.",
 "91": "Several models on accelerated instances, real-time, each scaling differently, no cold starts → one endpoint with an inference component per model, each with its own auto scaling and a minimum of at least 1 copy. Serverless has no GPUs. Async isn't real time. Multi-model endpoints load models on demand, which causes cold starts.",
 "92": "Training fails with AccessDenied after the bucket switched to SSE-KMS → add kms:Encrypt and kms:Decrypt to the training job's execution role. The job reads and writes data as that role, and that role needs permission to use the key.",
 "93": "Steady training usage for over a year → a SageMaker AI Savings Plan, 1-year, All Upfront. Serverless endpoints and Edge Manager don't apply to training. Heterogeneous clusters are a performance feature, not a pricing option.",
 "94": "Matching question on services for each task → store the data in S3, transform it with Glue, query it with Athena. Kinesis Data Streams is for streaming, which isn't needed here.",
 "95": "Detect falling accuracy over time from live data → a scheduled Model Monitor job comparing live data with a baseline built from the training data. Custom Lambda math or CloudWatch dashboards mean building it yourself. Debugger is for training jobs.",
 "96": "Find trends that could skew the model across demographic groups → SageMaker Clarify for bias analysis of the data and predictions. CloudWatch CPU metrics, DataBrew recipes and Lambda preprocessing don't measure bias. (Clarify is closed to new customers. Existing customers can still use it.)",
 "97": "10 instances plus 1 spare, no downtime → a rolling deployment with a batch size of 1, which swaps capacity a little at a time using the single extra instance. Blue/green would need a whole second fleet of 10. Shadow tests don't switch versions.",
 "98": "Monitor training metrics and send SMS when training finishes → CloudWatch for the metrics and SNS for the text message. CloudTrail records API calls, not performance. SQS is a queue and can't send SMS.",
 "99": "Prevent notebook instances that allow root access → an IAM policy using the sagemaker:RootAccess condition key, which blocks the create request. KMS keys don't control root access. Watching events with EventBridge or CloudFormation reacts after the notebook already exists.",
 "100": "Training must be isolated from the internet but read S3 → private subnets plus an S3 gateway endpoint. A NAT gateway, or public subnets with an internet gateway, open a path to the internet. Bucket encryption doesn't isolate the network.",
 "101": "Automatically create versions of models as they're created → SageMaker Model Registry, which versions model packages within model groups. ECR versions containers. Marketplace packages and Lineage Tracking aren't version catalogs.",
 "102": "RAG over CSV and DOCX files in S3 for a Bedrock model, least overhead → a Bedrock knowledge base with the S3 bucket as its data source. Neptune, SageMaker AI pipelines and AutoML fine-tuning all mean building pieces yourself.",
 "103": "Payloads of 100–300 MB, processed within 60 minutes → Asynchronous Inference, which handles up to 1 GB per request and 1 hour of processing. Real-time allows 25 MB and serverless 4 MB, both with 60-second limits. Batch transform is for whole datasets.",
 "104": "Class imbalance in image classification → random oversampling of the minority class. Shrinking the dataset loses data. Transforming images or splitting data randomly doesn't fix the balance.",
 "105": "Mask credit card numbers in S3 files before retraining, least development effort → a Glue job using its built-in Sensitive Data Detection. Macie only finds the data. Writing your own Spark masking code or using EC2 is more work.",
 "106": "Get insight from health records and patient text, least effort → Amazon Comprehend Medical, which extracts medical entities. Building an RNN or seq2seq model is far more work. Kendra is search, not analysis.",
 "107": "Extract entities from a PDF and store them, least time → Amazon Comprehend to extract the entities, with output to S3. OCR tools on EC2 mean managing servers. Textract plus Comprehend, or Textract with A2I, adds steps. (Comprehend can read PDFs directly for entity extraction.)",
 "108": "Stop presigned Studio URLs from being misused by outsiders → an IAM policy condition on aws:SourceIp so only your network's IP range can use the URL. The other condition keys don't match how presigned URLs are abused.",
 "109": "Weekly merge of large S3 CSV files with Aurora data, least overhead → a scheduled Glue Spark job using DynamicFrame operations, which is serverless. A transient EMR cluster takes more setup. Lambda can't run Spark. Batch on EC2 is more to manage.",
 "110": "Is higher latency on a serverless endpoint caused by model startup? → check the ModelSetupTime metric in CloudWatch, which measures the time to launch new compute for serverless endpoints, a sign of cold starts. ModelLoadingWaitTime is a multi-model endpoint metric. Model Monitor measures model quality, not startup.",
 "111": "Remove PII before training, most operationally efficient → the Comprehend DetectPiiEntities API to redact it, then store the result in S3 for training. Macie finds PII but doesn't redact it.",
 "112": "Install a custom script on every new notebook instance → a lifecycle configuration that runs when the notebook is created or started. Custom ECR images, CodeArtifact repositories and Lambda watchers are more work.",
 "113": "Near real-time clickstream processing with SQL and Jupyter notebooks for analysis → Amazon MSK for ingestion plus Managed Service for Apache Flink, which supports SQL and Studio notebooks, for processing. Firehose plus Lambda lacks the SQL-and-notebook analysis.",
 "114": "Keep both PII and PHI out of training → Comprehend to detect PII and Comprehend Medical to detect PHI, masking both before training. Encryption hides data but doesn't remove it from training. DataBrew and Redshift functions don't detect medical PHI as well.",
 "115": "Use custom libraries in processing jobs, training jobs and pipelines → build one custom Docker container, host it in ECR, and reuse it everywhere. Installing libraries by hand or running code on EC2 doesn't scale.",
 "116": "Alerts on data quality issues in production → a Model Monitor monitoring job integrated with CloudWatch alarms. A CloudWatch alarm alone has no data quality checks. Clarify is for bias. Data Wrangler is for data preparation.",
 "117": "Train on more than 300 GB of 200 MB files that also feed a dashboard, most cost-effective → S3 in FastFile mode without S3 Express One Zone, which streams from the existing bucket at no extra storage cost. EFS, FSx for Lustre and Express One Zone all add storage you pay for.",
 "118": "Compare a new model with the current one before shifting all traffic, least effort → deploy the new model as a shadow variant on the same endpoint. Separate endpoints, CloudFront splits and custom Lambda routing are more work.",
 "119": "Stop SageMaker AI from collecting metadata from training jobs → opt out of metadata tracking for each submitted training job. Private subnets, KMS encryption and Nitro instances don't change what metadata SageMaker collects.",
 "120": "EC2 instances in a private subnet must reach Bedrock privately → an interface VPC endpoint (PrivateLink) for Bedrock. Security groups don't create a path. Bedrock can't be placed in your subnet. Direct Connect is for on-premises links.",
 "121": "Matching question on evaluation tasks. Product description generation → open-ended generation. Review sentiment → classification. Support chatbot → question answering. Condensing reviews → text summarization.",
 "122": "Launch an internal assistant on an open-source LLM, least overhead → deploy the LLM with SageMaker JumpStart and build the chat interface with Amazon Lex. A model on raw EC2, a custom HTML/WebSocket front end, or QuickSight are more work or the wrong tool.",
 "123": "Ingest and transform 5 GB per minute of streaming data, then load it into a store for fast queries → Kinesis Data Streams, Managed Service for Apache Flink, then DynamoDB. EventBridge, SQS and SNS aren't built for high-volume streaming analytics.",
 "124": "Encrypt a CSV file and control which applications can use the key → a KMS customer managed key, used with the AWS Encryption CLI. The key policy decides who can use it. SSH keys and API Gateway keys aren't encryption keys for data. An IAM role alone doesn't encrypt anything.",
 "125": "Engineer features, then process and store them → SageMaker Feature Processing to create and ingest the features, and Feature Store to manage and store them. Model Monitor, Flink and batch transform aren't feature management tools.",
 "126": "Minimize response latency for a scoring model → a real-time inference endpoint, always on and answering immediately. Batch, async and serverless all add delay.",
 "127": "Online store updated with the latest data as it arrives, plus a complete offline store → the Feature Store Spark connector ingesting with both online and offline stores enabled. Ingesting everything one record at a time with PutRecord is slow at this volume.",
 "128": "Four models on different frameworks, each callable separately, most cost-effective → a multi-container endpoint, which hosts different framework containers behind one endpoint with direct invocation. Multi-model endpoints share one framework container. Separate endpoints cost more.",
 "129": "Automatically stop a notebook after 1 hour idle → a lifecycle configuration with the auto-stop-idle script in the Start notebook section, so it runs every time the notebook starts. The Create section runs only once. CloudWatch Logs and Lambda watchers are more work.",
 "130": "Register your own labeling specialists to receive tasks → a private (internal) workforce in SageMaker Ground Truth. Mechanical Turk is a public crowd. Data Exchange is for buying and selling data.",
 "131": "CPU model with intermittent business-hours traffic and nothing at night, most cost-effective → Serverless Inference, with provisioned concurrency raised during business hours. A real-time endpoint pays even when idle. Async is for large or slow requests.",
 "132": "Label images with the highest accuracy, visible only to employees → a Ground Truth annotation job plus a private workforce of your own team. Rekognition auto-labels aren't accurate enough for this. Mechanical Turk exposes the data to outsiders. Training on unlabeled data doesn't work for supervised learning.",
 "133": "Clean and normalize S3 data with DataBrew → create a DataBrew dataset from the S3 path and run a recipe job. JDBC connections are for databases, not S3.",
 "134": "Turn nested JSON into tables for XGBoost, least overhead → a Glue PySpark job with the Relationalize transform, built to flatten nested JSON. Custom Scala, Lambda code or Athena SQL workarounds are more work.",
 "135": "Log the settings and results of hundreds of training iterations, least effort → SageMaker Experiments, built for tracking runs. CloudWatch custom metrics, S3 logs and Model Registry aren't experiment trackers.",
 "136": "Serverless internal chat over a large document knowledge base → Bedrock with a foundation model, Lambda with API Gateway to call it, and S3 to store vector data and embeddings. JumpStart and EC2 mean running servers. RDS for MySQL isn't the vector store here. Note: today, a Bedrock knowledge base would be the more natural way to store and retrieve the embeddings.",
 "137": "Several minutes per request and up to 100 MB per request, least overhead → Asynchronous Inference. Real-time endpoints time out at 60 seconds and accept up to 25 MB. EC2 or ECS hosting means managing infrastructure.",
 "138": "Yes/no survey answers to encode without adding dimensions → binary encoding or label encoding, which keep a single column. One-hot encoding adds columns. Imputation fills gaps. Tokenization is for text.",
 "139": "Matching question on algorithms. Detect anomalies → Random Cut Forest. Label every pixel → semantic segmentation. Translate text → seq2seq.",
 "140": "Recommendations from high-dimensional sparse data → Factorization Machines, designed to capture interactions in sparse data. k-NN, PCA and seq2seq aren't built for sparse recommendation data.",
 "141": "Models built on laptops with scikit-learn and TensorFlow, to be rebuilt on SageMaker AI and registered, least overhead → rebuild them in SageMaker AI with its built-in framework support, and register them in Model Registry. Bring-your-own-container and API Gateway with Lambda wrappers are more work.",
 "142": "A live conversational engine needs instant answers → real-time inference, which rules out asynchronous inference and batch transform (options C and D). Option B is wrong because large model inference containers are for serving models, not training them. That leaves A. See the documentation check below about Training Compiler's status.",
 "143": "Test v2 on production traffic with no disruption before switching → a shadow variant that samples 100% of requests while users keep getting v1, with outputs logged to S3, then promote v2. Production variants at 1% or 10% expose some users to v2.",
 "144": "Stop SageMaker AI from collecting usage and error metadata during training → set the OPT_OUT_TRACKING opt-out on each training job submitted through the CLI, Boto3 or the SageMaker Python SDK. Option C invents a domain setting that doesn't exist. Training jobs created in the console already have metadata collection off by default. IAM roles that deny CloudWatch don't control this collection.",
 "145": "DPL of +0.9 means the 40–45 age group gets far more positive labels than other groups → undersample that group's positive class to bring it back in line. Oversampling it makes the imbalance worse."
};
const C01_CAUTION = [35, 142, 106, 32, 78, 87, 111, 122];
const C01_DOC_NOTES = {
 "1": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-register-model.html",
  "note": "Model Registry tracks every version of a model inside a model group and manages each version's approval status. ECR only stores container images; it isn't a model catalog."
 },
 "3": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-approve.html",
  "note": "Model versions are registered as PendingManualApproval. A reviewer changes the status to Approved (in Studio, or through the SDK's update_model_package), and with SageMaker project templates that change starts CI/CD deployment. Experiments, Lineage Tracking and Model Monitor don't manage approvals."
 },
 "10": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html",
  "note": "Lake Formation brings S3 data and databases (including on-premises databases over JDBC) into one governed data lake with a central catalog. Kinesis streams records and DynamoDB is a database, so neither aggregates these sources. EMR Spark could work, but you'd have to build it."
 },
 "11": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-insights.html",
  "note": "Data Wrangler's Data Quality and Insights report detects anomalous samples with an isolation forest, counts outliers and duplicates, and visualizes the results. Athena and Redshift Spectrum only run queries, and AWS Batch only runs jobs."
 },
 "12": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
  "note": "Data Wrangler's Encode categorical transform (one-hot or ordinal) turns categories into numbers without code, which is the least overhead. Turning numbers into categories throws information away."
 },
 "13": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
  "note": "Data Wrangler's Balance data operation offers random oversampling, random undersampling and SMOTE as built-in transforms."
 },
 "19": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/athena/latest/ug/ctas.html",
  "note": "A CTAS query creates a new table from query results in one step and can partition the data and convert it to Parquet or ORC. That's less work than replication, a Glue job, or Firehose plus Lambda."
 },
 "20": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/glue/latest/dg/machine-learning.html",
  "note": "FindMatches finds duplicate or matching records 'even when the records do not have a common unique identifier and no fields match exactly'. AWS says it 'will not require writing any code'."
 },
 "22": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/comprehend/latest/dg/custom-copy.html",
  "note": "Account A attaches an IAM resource policy to the model version, and account B imports it with ImportModel into the same Region. No retraining and no copying of training data."
 },
 "29": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/modelcollections.html",
  "note": "Model Registry Collections group model groups (for example NLP-models and CV-models) into nested hierarchies. AWS says operations on collections 'do not affect the integrity of the individual Model Groups', so the artifacts in S3 and ECR aren't modified."
 },
 "32": {
  "verdict": "Answer stands, with a caveat",
  "source": "https://docs.aws.amazon.com/kinesisanalytics/latest/sqlref/sqlrf-random-cut-forest.html",
  "note": "RANDOM_CUT_FOREST is a built-in anomaly function of the legacy Kinesis Data Analytics for SQL service, not of Apache Flink itself, so the option's wording is dated. A is still the intended answer, because it's the only managed streaming option with built-in anomaly detection. Remember: streaming anomaly detection = Random Cut Forest."
 },
 "36": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html",
  "note": "Firehose lets the buffer interval go down to 0 seconds for OpenSearch (range 0 to 900). With zero buffering, AWS says Firehose 'will not buffer data and will deliver data within a few seconds'. Raising the interval (C) makes latency worse."
 },
 "41": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-sagemaker-model.html",
  "note": "AWS::SageMaker::Model creates 'a model to host at an Amazon SageMaker endpoint'. The Endpoint and EndpointConfig resources come after it, in that order."
 },
 "43": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-importing-data.html",
  "note": "Canvas imports tabular data as CSV or Parquet. Parquet is columnar and compressed, so it's the format that minimizes processing for complex data. AWS's page lists the formats but doesn't make the speed claim itself."
 },
 "46": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/build-and-manage-steps-types.html",
  "note": "Pipelines has no Glue step. AWS says the Callback step adds 'processes and AWS services into your workflow that aren't directly provided by Amazon SageMaker Pipelines'. The pipeline posts a token to SQS, waits, and continues when the Glue job reports success."
 },
 "47": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/redshift/latest/dg/t_ddm.html",
  "note": "Redshift dynamic data masking changes 'how Amazon Redshift shows sensitive data to the user at query time, without transforming it in the database', using policies for each user or role."
 },
 "51": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html",
  "note": "Real-time inference fixes the async delay. Model Monitor watches model quality and 'can set alerts that notify you when there are deviations in the model quality'. Inference Recommender only picks instance types."
 },
 "54": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
  "note": "Data Wrangler's Manage columns transforms drop columns with no code, which is the least effort for a 50 MB file."
 },
 "57": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html",
  "note": "Serverless Inference scales to 0 between requests, and a 3 MB payload under one minute fits its limits. Async endpoints and real-time endpoints can't be configured the way options B and C describe, and multi-model endpoints aren't supported on serverless."
 },
 "58": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
  "note": "Data Wrangler's built-in image transforms include CorruptImage (along with EnhanceImage and ResizeImage), built on imgaug. Adding noise is augmentation: it teaches the model to handle lower-quality camera images, and it's faster than collecting new data."
 },
 "60": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-transform.html",
  "note": "Data Wrangler joins and concatenates datasets and has built-in transforms for missing values, duplicates and outliers. Ground Truth is for labeling, not cleaning."
 },
 "67": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html",
  "note": "Asynchronous Inference is 'ideal for requests with large payload sizes (up to 1GB), long processing times (up to one hour)' and scales with a scaling policy. 50 MB rules out real-time and serverless."
 },
 "70": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html",
  "note": "AWS says 'Serverless Inference with provisioned concurrency is a cost-effective option when you have predictable bursts in your traffic', keeping endpoints warm while AWS manages scaling."
 },
 "75": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/databrew/latest/dg/recipe-actions.pii.html",
  "note": "DataBrew has PII recipe steps (masking, encryption, hashing, substitution), so you can mask values while keeping the column. Macie only finds sensitive data; it doesn't change it."
 },
 "76": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html",
  "note": "Model Monitor supports 'continuous monitoring with a batch transform job that runs regularly' and sends alerts on deviations. Batch transform is the asynchronous option for large datasets."
 },
 "78": {
  "verdict": "Answer stands, with a caveat",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
  "note": "AWS's training-data page lists S3, EFS and FSx for Lustre as training inputs; FSx for ONTAP isn't listed. Mounting ONTAP over NFS is something you set up yourself. Of the options, A is the only workable one (Mountpoint for S3 can't link to FSx, and Data Wrangler doesn't connect to it). If FSx for Lustre is offered on your exam, that's the documented choice."
 },
 "84": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-ram.html",
  "note": "Model Registry shares model package groups across accounts with resource policies (through AWS RAM), which gives you one central catalog. ECR replication copies images, not model metadata."
 },
 "87": {
  "verdict": "Answer stands, with a caveat",
  "source": "https://docs.aws.amazon.com/databrew/latest/dg/supported-data-file-sources.html",
  "note": "Confirmed: 'If you are importing a folder, all files in the folder must be of the same file type', so the file types have to be separated (which rules out A and B). Caveat: DataBrew also offers an 'AWS Glue Parquet' output format, so D isn't clearly wrong. Apache Parquet (C) is the community-keyed answer."
 },
 "91": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints-deploy-models.html",
  "note": "Inference components let each model have its own copy count and scaling, plus 'a minimum number of copies to ensure that the model loads'. Setting the minimum to at least 1 avoids cold starts. Serverless has no GPUs, and multi-model endpoints load models on demand, which causes cold starts."
 },
 "101": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-register-model.html",
  "note": "Model Registry adds each registered model as a new version in its model group automatically."
 },
 "103": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html",
  "note": "Payloads up to 1 GB with processing up to one hour = Asynchronous Inference. Real-time and serverless can't take 100 to 300 MB payloads."
 },
 "105": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/glue/latest/dg/detect-PII.html",
  "note": "Glue's Detect PII transform can 'detect, mask, or remove' entities, including credit card numbers, with redact, partial-redact or hash actions. No regex to write. Macie discovers sensitive data but doesn't mask it."
 },
 "111": {
  "verdict": "Answer stands, with a caveat",
  "source": "https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html",
  "note": "AWS says the real-time DetectPiiEntities call locates PII (type and character offsets). Redaction is done by an asynchronous batch job. So option A's wording is loose, but its approach (Comprehend removes PII, then S3 feeds training) is still the most efficient option. Macie only discovers PII, and S3 isn't 'mounted' to training instances."
 },
 "112": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/notebook-lifecycle-config.html",
  "note": "Lifecycle configuration scripts run when a notebook instance is created or started. That's the built-in hook for installing scripts, with the least overhead."
 },
 "113": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/managed-flink/latest/java/how-zeppelin.html",
  "note": "Managed Service for Apache Flink Studio notebooks (Apache Zeppelin) support SQL, Python and Scala for interactive analysis and visualization of streaming data. That covers the SQL plus notebook requirement, with MSK for ingestion."
 },
 "114": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html",
  "note": "Comprehend detects and redacts general PII. Comprehend Medical detects PHI in clinical text (see its docs). Encrypting the data (D) doesn't keep the data out of training."
 },
 "117": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
  "note": "Fast file mode streams S3 objects on demand, so training starts without downloading 300 GB, and the data stays in S3 Standard where the dashboard already reads it. Express One Zone, EFS and FSx would all add storage cost. AWS's page doesn't compare costs; that part is reasoning."
 },
 "122": {
  "verdict": "Answer stands, with a caveat",
  "source": "https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html",
  "note": "JumpStart (A) is clearly right for deploying an open-source LLM. For the interface, the community key picks Lex (E), which builds conversational voice and text interfaces. Option C (API Gateway WebSocket plus Lambda plus your own HTML) also works, but it's more to build. Expect A plus a managed conversational front end on the exam."
 },
 "125": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-feature-processing.html",
  "note": "Feature Store Feature Processing transforms raw data into features and ingests them into feature groups, and Feature Store manages the infrastructure. Model Monitor and batch transform don't do feature engineering."
 },
 "127": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/batch-ingestion-spark-connector-setup.html",
  "note": "By default the Feature Store Spark connector writes to the online store with PutRecord, keeping the latest record, and also fills the offline store when both are enabled. It runs on EMR."
 },
 "128": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/multi-container-endpoints.html",
  "note": "Multi-container endpoints host containers with different frameworks on one endpoint, and each container can be invoked directly to optimize cost. Multi-model endpoints need models that share one framework or container."
 },
 "130": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-private.html",
  "note": "A Ground Truth private workforce is 'a group of workers that you choose', such as your own employees or subject-matter experts. Mechanical Turk is a public crowd (and it has now closed)."
 },
 "131": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html",
  "note": "Serverless Inference scales to 0 when there are no requests, and provisioned concurrency keeps it warm during busy hours. This model runs on CPU, which serverless supports (no GPUs)."
 },
 "132": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-private.html",
  "note": "Ground Truth labeling job plus a private workforce of employees. Mechanical Turk must not see confidential data, and Rekognition's automatic labels are less accurate than expert humans."
 },
 "133": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/databrew/latest/dg/jobs.recipe.html",
  "note": "'Use a DataBrew recipe job to clean and normalize the data.' Profile jobs only analyze data quality and statistics. You point at S3 by path; JDBC is for databases."
 },
 "134": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-crawler-pyspark-transforms-Relationalize.html",
  "note": "Relationalize 'flattens a nested schema in a DynamicFrame and pivots out array columns', turning nested JSON into tables with a built-in transform."
 },
 "137": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html",
  "note": "Processing time of several minutes with payloads of up to 100 MB = Asynchronous Inference (up to 1 GB and 1 hour). It's managed, so less overhead than EC2 or ECS. Real-time has a 60-second timeout."
 },
 "145": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-data-bias-metric-true-label-imbalance.html",
  "note": "DPL = qa \u2212 qd. A positive value means facet a (ages 40 to 45 here) has a much higher share of positive labels than everyone else. To bring it down, reduce positives in that facet: undersample the positive class for ages 40 to 45 (B)."
 },
 "31": {
  "verdict": "Answer confirmed, with a note",
  "source": "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html",
  "note": "Transcribe turns audio (and the audio in video) into text, Translate turns Spanish into English, and a Bedrock text model summarizes. The other options use the wrong tool: Rekognition analyzes images and video, Comprehend can't transcribe audio, and Stable Diffusion generates images. Note: AI21's Jurassic models may no longer be offered on Bedrock. On the exam, focus on the pipeline (Transcribe \u2192 Translate \u2192 Bedrock text model), not on the model name."
 },
 "73": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/pre-built-containers-frameworks-deep-learning.html",
  "note": "SageMaker provides prebuilt PyTorch and TensorFlow images, and the Python SDK runs your own training script inside them (script mode). That keeps the custom Python and the domain logic with the least effort. Building your own container (C) is for needs the prebuilt images can't meet, and built-in algorithms (A) would mean rewriting the model."
 },
 "124": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/crypto-cli.html",
  "note": "The AWS Encryption CLI encrypts files at the command line with envelope encryption, using a KMS key as the wrapping key. Who can use the key is controlled by the KMS key policy and IAM, which meets the 'control which applications have access to the key' requirement. SSH keys and API Gateway API keys aren't encryption keys. C only grants a permission; it never creates the key you control."
 },
 "24": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html",
  "note": "Kendra is a managed search service that ranks by semantic and contextual similarity rather than keywords, and it connects to sources such as S3. Textract only extracts text, and Glue and Feature Store aren't vector search engines. Side note: Kendra is now closed to new customers (AWS points to Bedrock Knowledge Bases), but C01 lists it in scope."
 },
 "25": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-automate-model-development.html",
  "note": "Autopilot analyzes the data, explores algorithms, tunes hyperparameters, and ranks candidates by performance, all from a tabular dataset and a target column. That's the least effort for checking whether the target is predictable. Macie finds sensitive data, and Bedrock foundation models aren't meant for tabular prediction."
 },
 "33": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/comprehend/latest/dg/comprehend-general.html",
  "note": "Comprehend's pre-trained sentiment insight returns positive, neutral, negative or mixed with no training data, and AWS's own example is 'find out how customers feel about your products'. Training Naive Bayes or random forests takes longer, and Rekognition analyzes images and video, not text."
 },
 "53": {
  "verdict": "Answer confirmed (alerting part)",
  "source": "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html",
  "note": "AWS Budgets sends notifications by email or SNS when costs exceed, or are forecast to exceed, a threshold. That eliminates both Cost Explorer options. Not checked: whether tags on the SageMaker domain user profile propagate to the resources it creates. The Budgets half alone is enough to rule out A and C."
 },
 "64": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
  "note": "An S3 gateway endpoint gives private S3 access with no internet gateway or NAT. Bucket policies can grant access to principals from other AWS accounts. AWS also says gateway endpoints can't be used through VPC peering, a transit gateway or Direct Connect, which rules out the peering and transit-gateway options."
 },
 "68": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/comprehend/latest/dg/comprehend-general.html",
  "note": "Comprehend's key-phrase insight extracts important phrases with a pre-trained model, and custom entity recognition handles your own terms. Both are managed APIs, so they have the least operational overhead compared with NLTK on EC2, BlazingText plus TF-IDF, or Lambda scripts."
 },
 "92": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html",
  "note": "AWS's CreateTrainingJob execution-role page says that if the input is SSE-KMS encrypted you add kms:Decrypt, and if you specify a KMS key for output you add kms:Encrypt. The permissions go on the execution role, not on the user who started the job (that rules out D). kms:CreateGrant is only for a volume KMS key."
 },
 "100": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
  "note": "An S3 gateway endpoint lets resources in private subnets reach S3 'without requiring an internet gateway or NAT device'. A NAT gateway (A) sends traffic out to the internet, which is the opposite of isolation. Strictest version: also set EnableNetworkIsolation on the training job."
 },
 "102": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-ds.html",
  "note": "Bedrock knowledge bases take S3 as a data source and list .csv and .doc/.docx as supported formats. Bedrock manages ingestion and retrieval, which gives the least overhead."
 },
 "106": {
  "verdict": "Answer stands, with a caveat",
  "source": "https://docs.aws.amazon.com/comprehend-medical/latest/dev/comprehendmedical-welcome.html",
  "note": "Comprehend Medical detects medical entities (conditions, medications, PHI) in clinical text and links them to RxNorm, ICD-10-CM and SNOMED CT. It doesn't write summaries, despite the option's wording. It's still the only no-training managed medical NLP option offered, so B is the best answer for 'insight with least effort'. On the exam, pick Comprehend Medical for medical text insight, and pick a foundation model when a true summary is required."
 },
 "120": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html",
  "note": "AWS says PrivateLink interface endpoints let you access Bedrock 'without the use of an internet gateway, NAT device, VPN connection, or Direct Connect connection'. Instances don't need public IPs. The endpoint service for model calls is bedrock-runtime."
 },
 "135": {
  "verdict": "Answer confirmed, with a note",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/experiments.html",
  "note": "SageMaker Experiments automatically tracks the inputs, parameters, configurations and results of each iteration as runs, and lets you compare them. AWS now recommends SageMaker AI with MLflow for new work in the updated Studio. On C01, 'track and compare training iterations' = Experiments; Model Registry is for versioning approved models."
 },
 "35": {
  "verdict": "Question flawed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/ll_hyperparameters.html",
  "note": "AWS's Linear Learner hyperparameter reference says target_precision only takes effect when binary_classifier_model_selection_criteria is recall_at_target_precision, which is a binary-classifier setting. Because this question sets predictor_type to multiclass_classifier, target_precision would have no effect. Option C is the intended answer only if the model were a binary classifier. Remember the concept: to cut false positives in Linear Learner, use a binary classifier with recall_at_target_precision and raise target_precision."
 },
 "142": {
  "verdict": "Answer stands, with a caveat",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/training-compiler.html",
  "note": "AWS states there will be no new releases or versions of SageMaker Training Compiler, and its Deep Learning Containers no longer get patches. Training Compiler speeds up deep learning training on GPU instances and doesn't change the final model. Among these four options, A is still the best match. For new LLM training work, today you would look at SageMaker AI distributed training or HyperPod."
 },
 "144": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-privacy.html",
  "note": "AWS documentation: opting out of metadata collection is set per training job in the CreateTrainingJob call (OPT_OUT_TRACKING=1 through the CLI, Boto3 or the SageMaker Python SDK), and it can't be done inside a training script. Jobs created in the console have metadata collection off by default. That confirms D. (An earlier version of this simulator wrongly flagged this answer as disputed.)"
 },
 "119": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/data-privacy.html",
  "note": "AWS documentation: you must opt out of metadata collection for each training job you submit, through the API call (OPT_OUT_TRACKING=1). Private subnets, KMS keys and Nitro instances don't affect it."
 },
 "110": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/monitoring-cloudwatch.html",
  "note": "AWS defines ModelSetupTime as the time it takes to launch new compute resources for a serverless endpoint. ModelLoadingWaitTime is a multi-model endpoint metric. That confirms C."
 },
 "97": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-rolling.html",
  "note": "AWS recommends rolling deployments for accelerated instances that are in high demand, because they need fewer extra instances than blue/green. The rolling batch size can be 5–50% of the fleet. 1 of 10 instances is 10%, which fits the single spare Reserved Instance."
 },
 "2": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/train-warm-pools.html",
  "note": "Warm pools keep provisioned training infrastructure after a job ends, so matching consecutive jobs start faster. (Warm pools can't be used with Spot Instances, which is one more reason Spot doesn't fit this question.)"
 },
 "34": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html",
  "note": "A lower temperature leads to more deterministic responses, and a lower Top K means fewer candidate tokens. Lowering both reduces randomness."
 },
 "38": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html",
  "note": "AWS's own table for data-critical workloads: primary node On-Demand, core nodes On-Demand, task nodes Spot. Core nodes store HDFS data, so terminating one risks data loss. Task nodes hold no persistent data."
 },
 "39": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-actions.html",
  "note": "Debugger built-in actions can stop a training job automatically when a rule finds an issue such as non-convergence, which saves compute. Exam note: the MLA-C01 exam guide names SageMaker Debugger directly (Task 2.3, debugging model convergence), so study it fully. AWS has since closed Debugger to new customers, but that doesn't change what C01 tests."
 },
 "42": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/lake-formation/latest/dg/tag-based-access-control.html",
  "note": "AWS recommends LF-Tag-based access control when there are many Data Catalog resources, because tagging resources and granting tags needs far fewer grants than granting each resource by name."
 },
 "45": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/logging-using-cloudtrail.html",
  "note": "Confirmed, with a detail the question leaves out: CloudTrail records InvokeEndpoint as a data event. Data events aren't logged by default and cost extra, so you have to configure data event logging on a trail."
 },
 "48": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-actions.html",
  "note": "Debugger built-in rules can trigger actions automatically: StopTraining, email or SMS through SNS. Exam note: the MLA-C01 exam guide names SageMaker Debugger directly (Task 2.3, debugging model convergence), so study it fully. AWS has since closed Debugger to new customers, but that doesn't change what C01 tests."
 },
 "49": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html",
  "note": "In a shadow test, SageMaker AI sends a copy of live requests to the shadow variant, and only the production variant's responses are returned to the caller, so users aren't affected."
 },
 "118": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html",
  "note": "Shadow tests compare a new variant on live traffic within the same endpoint. Only production responses reach users."
 },
 "143": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html",
  "note": "A shadow variant receives copies of requests while callers only get the production variant's responses, so v2 can be checked on 100% of traffic with no risk to users."
 },
 "55": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/guardrails-global-controls.html",
  "note": "Q Business global controls include blocked phrases, so chat responses don't include those words. Exam note: Amazon Q is on the MLA-C01 in-scope services list. AWS has since closed Q Business to new customers in favor of Amazon Quick, but that doesn't change what C01 tests."
 },
 "56": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-llms-finetuning-models.html",
  "note": "Autopilot can fine-tune large language models from SageMaker JumpStart through an AutoML job."
 },
 "59": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
  "note": "Secrets Manager supports automatic rotation schedules, using a Lambda function for custom rotation."
 },
 "63": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html",
  "note": "Hyperband reallocates resources and stops underperforming jobs early, which AWS says can significantly speed up tuning compared with random search and Bayesian optimization."
 },
 "66": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-create-baseline.html",
  "note": "The baseline (statistics and constraints) is the standard that drift is measured against, and it's usually built from the training dataset. When the model and its data change, create a new baseline from the latest dataset. Exam note: the MLA-C01 exam guide names SageMaker Model Monitor directly (Task 4.1, monitoring models in production), so study it fully. AWS has since closed Model Monitor to new customers, but that doesn't change what C01 tests."
 },
 "95": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-create-baseline.html",
  "note": "Model Monitor compares live data with baseline statistics and constraints built from the training dataset, which detects drift. Exam note: the MLA-C01 exam guide names SageMaker Model Monitor directly (Task 4.1, monitoring models in production), so study it fully. AWS has since closed Model Monitor to new customers, but that doesn't change what C01 tests."
 },
 "116": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-create-baseline.html",
  "note": "Model Monitor checks production data against a baseline and emits CloudWatch metrics that can drive alarms. Exam note: the MLA-C01 exam guide names SageMaker Model Monitor directly (Task 4.1, monitoring models in production), so study it fully. AWS has since closed Model Monitor to new customers, but that doesn't change what C01 tests."
 },
 "4": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-explainability.html",
  "note": "Clarify provides bias and explainability analysis. Running a Clarify job from Lambda makes the check on demand. Exam note: the MLA-C01 exam guide names SageMaker Clarify directly in Tasks 1.3 (bias in data), 2.3 (interpreting model outputs) and 4.1 (data distribution changes), so it's core C01 material. AWS has since closed Clarify to new customers, but that doesn't change what C01 tests."
 },
 "71": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-explainability.html",
  "note": "Clarify uses SHAP feature attributions to explain why a model made a prediction. Exam note: the MLA-C01 exam guide names SageMaker Clarify directly in Tasks 1.3 (bias in data), 2.3 (interpreting model outputs) and 4.1 (data distribution changes), so it's core C01 material. AWS has since closed Clarify to new customers, but that doesn't change what C01 tests."
 },
 "96": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-explainability.html",
  "note": "Clarify detects bias and explains predictions, which surfaces trends that skew results across groups. Exam note: the MLA-C01 exam guide names SageMaker Clarify directly in Tasks 1.3 (bias in data), 2.3 (interpreting model outputs) and 4.1 (data distribution changes), so it's core C01 material. AWS has since closed Clarify to new customers, but that doesn't change what C01 tests."
 },
 "74": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
  "note": "FSx for Lustre gives high throughput with low-latency file retrieval and mounts quickly regardless of dataset size. It needs VPC setup."
 },
 "80": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/xgboost_hyperparameters.html",
  "note": "AWS: increasing max_depth makes the model more complex and likely to overfit, so decreasing it reduces overfitting."
 },
 "83": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html",
  "note": "Compute Optimizer analyzes utilization and gives rightsizing and idle-resource recommendations for EC2, EBS volumes, Amazon SageMaker and more."
 },
 "86": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
  "note": "Object detection identifies objects and their bounding boxes. Image classification only labels the whole image."
 },
 "139": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
  "note": "AWS's algorithm table: Random Cut Forest for anomaly detection, Semantic Segmentation for tagging every pixel, Sequence-to-Sequence for translation."
 },
 "140": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
  "note": "Factorization Machines is designed to capture interactions between features in high-dimensional sparse datasets."
 },
 "14": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
  "note": "LightGBM is a gradient-boosted tree algorithm for tabular classification and regression. Tree ensembles capture feature interactions that linear models miss."
 },
 "89": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/train-encrypt.html",
  "note": "Enable inter-container traffic encryption (EnableInterContainerTrafficEncryption) to protect data passed between instances in distributed training."
 },
 "90": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/timeseries-objective-metric.html",
  "note": "RMSE and weighted quantile loss (wQL) are listed time-series forecasting metrics. Recall and LogLoss are classification metrics."
 },
 "93": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-services.html",
  "note": "SageMaker AI usage is covered by SageMaker AI Savings Plans."
 },
 "99": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/security_iam_id-based-policy-examples.html",
  "note": "AWS documents the sagemaker:RootAccess condition key for blocking notebook instances that allow root access."
 },
 "107": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/comprehend/latest/dg/idp-inputs-sync.html",
  "note": "Amazon Comprehend can take PDF documents directly for custom entity recognition. It uses its own parser for digital PDFs and calls Textract itself for scanned files."
 },
 "108": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/security_iam_id-based-policy-examples.html",
  "note": "AWS's example restricts presigned URL creation to listed IP ranges with the aws:SourceIp condition key."
 },
 "121": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-foundation-model-evaluate-overview.html",
  "note": "FMEval task types: open-ended generation, text summarization, question answering and classification. That matches each use case to its task."
 },
 "129": {
  "verdict": "Answer confirmed",
  "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/notebook-lifecycle-config.html",
  "note": "Lifecycle configuration scripts run when a notebook instance is created or whenever it starts. The auto-stop check has to be set up on every start."
 }
};
const C01_CONCEPT_ONLY = [8, 15, 17, 18, 21, 23, 30, 44, 61, 65, 69, 72, 81, 88, 98, 16, 26, 50, 77, 104, 138];
EXAM_DATA.forEach(q => { if (q.number <= 145 && !q.origin) { q.c01 = true; if (C01_EXPLANATIONS[q.number]) q.explanation = C01_EXPLANATIONS[q.number]; if (C01_CAUTION.includes(q.number)) q.answerCaution = true; if (C01_DOC_NOTES[q.number]) q.docNote = C01_DOC_NOTES[q.number]; q.checkStatus = C01_DOC_NOTES[q.number] ? 'doc' : (C01_CONCEPT_ONLY.includes(q.number) ? 'concept' : 'unchecked'); } });
