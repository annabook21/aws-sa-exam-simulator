// MLA-C01 question types the pool was missing (479+). The C01 exam guide lists five question types: multiple choice,
// multiple response, ordering, matching and case study. The pool had only 8 ordering/matching questions and no case studies.
// Written by Claude on 2026-10-30; each was written after reading the AWS documentation page in its "source" field.
const CASE_TEXT = {
  retail: "A retailer sells 3,000 products in 6 regions. Two years of weekly sales history are stored in Amazon RDS for PostgreSQL. Product attributes are stored as Parquet files in Amazon S3. Website clickstream events are sent to a Kinesis data stream. The ML team must build a weekly demand forecast for every product, including products launched in the last month, and planners want low (P10) and high (P90) estimates, not only a single number. The team prefers managed, serverless data preparation and wants to reuse the clickstream data for several weeks while it experiments with features.",
  bank: "A bank is building a credit card fraud model on 18 months of transactions. Fraud makes up 0.5% of transactions. The training data contains customer names, card numbers and phone numbers in free-text dispute notes. Compliance requires that real identifiers never appear in training data, but analysts must still be able to link transactions that belong to the same customer. A regulator requires the bank to explain to each customer why a transaction was declined. Every missed fraud case costs the bank on average $4,000, while a false alarm costs a short phone call to the customer. The current production model runs on a SageMaker AI real-time endpoint, and a new model must be evaluated on live traffic without affecting customers.",
  clinic: "A hospital network wants a model that outlines lung lesions on chest X-rays so radiologists can measure lesion area. It has 900 unlabeled X-ray images. Hospital policy says only the network's own radiologists may view patient images. Images are stored in Amazon S3. The data science team will train in SageMaker AI and later wants to retrain often on a growing image set, with many experiments reading the same images.",
  saas: "A SaaS company trains one XGBoost model per customer, 1,500 models in total, all using the same SageMaker AI XGBoost container. Most customers send a few requests per day, and occasional slower first requests are acceptable. One enterprise customer contract requires drift monitoring with Amazon SageMaker Model Monitor for that customer's model. The company's application servers run in private subnets that have no internet gateway or NAT device, and security forbids any inference traffic over the public internet."
};
EXAM_DATA.push(...[
  // ---------------- Ordering ----------------
  {
    "number": 479, "domain": 1, "task": "1.1", "question_type": "HOTSPOT_ORDER",
    "source": "https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html",
    "question": "IoT devices send CSV records to Amazon Data Firehose. The data must land in Amazon S3 as Apache Parquet. Select and order the steps that happen to each record, from arrival to storage. Each step should be selected one time or not at all. (Select and order four.)",
    "available_options": [
      "An AWS Lambda transform converts the CSV record to JSON.",
      "A JSON deserializer (OpenX JSON SerDe or Hive JSON SerDe) reads the record.",
      "Firehose uses the schema from an AWS Glue Data Catalog table to interpret the record.",
      "A Parquet serializer writes the record in columnar format to Amazon S3.",
      "Firehose reads the CSV directly with a CSV deserializer.",
      "Amazon Athena converts the record to Parquet."
    ],
    "correct_answer": {
      "step_1": "An AWS Lambda transform converts the CSV record to JSON.",
      "step_2": "A JSON deserializer (OpenX JSON SerDe or Hive JSON SerDe) reads the record.",
      "step_3": "Firehose uses the schema from an AWS Glue Data Catalog table to interpret the record.",
      "step_4": "A Parquet serializer writes the record in columnar format to Amazon S3."
    },
    "explanation": "AWS: Firehose converts from JSON to Parquet or ORC. 'If you want to convert an input format other than JSON, such as CSV... you can use AWS Lambda to transform it to JSON first.' Conversion then needs three elements in this order: a deserializer that reads the JSON, a schema from the Glue Data Catalog, and a serializer (Parquet or ORC). There is no CSV deserializer option, and Athena isn't part of Firehose delivery."
  },
  {
    "number": 480, "domain": 1, "task": "1.2", "question_type": "HOTSPOT_ORDER",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/machine-learning.html",
    "question": "An ML engineer will use the AWS Lake Formation FindMatches transform to remove duplicate customer records that have no shared ID. Select and order the steps. Each step should be selected one time or not at all. (Select and order four.)",
    "available_options": [
      "Catalog the source data as a table in the AWS Glue Data Catalog (for example, with a crawler).",
      "Create a job that uses the Find matches transform type, and generate a labeling file.",
      "Label matching and non-matching records in the labeling file, and upload it to teach the transform.",
      "Run the transform from an AWS Glue Spark job to output a match_id column or remove duplicates.",
      "Run SELECT DISTINCT in Amazon Athena to remove duplicates.",
      "Train an XGBoost model on the customer table to predict duplicates."
    ],
    "correct_answer": {
      "step_1": "Catalog the source data as a table in the AWS Glue Data Catalog (for example, with a crawler).",
      "step_2": "Create a job that uses the Find matches transform type, and generate a labeling file.",
      "step_3": "Label matching and non-matching records in the labeling file, and upload it to teach the transform.",
      "step_4": "Run the transform from an AWS Glue Spark job to output a match_id column or remove duplicates."
    },
    "explanation": "AWS's getting-started steps: create a Data Catalog table for the source data; create a job with the Find matches transform and choose 'Generate labeling file'; label it and upload it back so AWS Glue can teach the transform (you can repeat this to improve it); then call the transform from a Spark-based Glue job. The output is either a match_id column or a copy with duplicates removed. DISTINCT only removes exact duplicates, and FindMatches needs no custom ML model."
  },
  {
    "number": 481, "domain": 4, "task": "4.1", "question_type": "HOTSPOT_ORDER",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality.html",
    "question": "A team wants SageMaker Model Monitor to alert when the accuracy of a model on a real-time endpoint drops. Select and order the setup steps. Each step should be selected one time or not at all. (Select and order four.)",
    "available_options": [
      "Enable data capture on the endpoint.",
      "Run a baseline job that compares predictions with Ground Truth labels in a baseline dataset to create constraints.",
      "Define and schedule model quality monitoring jobs.",
      "Ingest Ground Truth labels into Amazon S3 so that Model Monitor merges them with captured predictions.",
      "Enable SageMaker Debugger built-in rules on the endpoint.",
      "Convert the endpoint to serverless inference."
    ],
    "correct_answer": {
      "step_1": "Enable data capture on the endpoint.",
      "step_2": "Run a baseline job that compares predictions with Ground Truth labels in a baseline dataset to create constraints.",
      "step_3": "Define and schedule model quality monitoring jobs.",
      "step_4": "Ingest Ground Truth labels into Amazon S3 so that Model Monitor merges them with captured predictions."
    },
    "explanation": "AWS's model quality steps run in this order: enable data capture, create a baseline, define and schedule monitoring jobs, then ingest Ground Truth labels that Model Monitor merges with the captured predictions (then integrate with CloudWatch and interpret results). Debugger is for training jobs, not endpoints. Serverless endpoints don't support data capture or Model Monitor."
  },
  {
    "number": 482, "domain": 2, "task": "2.2", "question_type": "HOTSPOT_ORDER",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-approve.html",
    "question": "A team uses a SageMaker AI project template with CI/CD. Select and order the steps that take a newly trained model to production after a human approves it. Each step should be selected one time or not at all. (Select and order three.)",
    "available_options": [
      "Register the model version in a model package group with the status PendingManualApproval.",
      "A reviewer evaluates the model and updates the version's status to Approved.",
      "The status change starts the CI/CD deployment of the approved version.",
      "Change an older version from Rejected to Approved to start the new deployment.",
      "Upload model.tar.gz to a versioned S3 bucket and tag it approved=true."
    ],
    "correct_answer": {
      "step_1": "Register the model version in a model package group with the status PendingManualApproval.",
      "step_2": "A reviewer evaluates the model and updates the version's status to Approved.",
      "step_3": "The status change starts the CI/CD deployment of the approved version."
    },
    "explanation": "AWS: you register a version with ModelApprovalStatus PendingManualApproval, then update it to Approved (for example, with update_model_package or in Studio). 'PendingManualApproval to Approved – initiates CI/CD deployment for the approved model version.' Approving an OLD version would deploy that old version, not the new one. S3 tags aren't part of the registry approval workflow."
  },
  {
    "number": 483, "domain": 1, "task": "1.2", "question_type": "HOTSPOT_ORDER",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-automated-labeling.html",
    "question": "Select and order what Amazon SageMaker Ground Truth does during one iteration of automated data labeling. Each step should be selected one time or not at all. (Select and order four.)",
    "available_options": [
      "Send a random sample of data objects to human workers for labeling.",
      "Train and validate a labeling model on the human-labeled data.",
      "Run batch inference on the unlabeled data and auto-label objects whose confidence meets the threshold.",
      "Send the remaining low-confidence objects to human workers.",
      "Auto-label every object, whatever its confidence.",
      "Ask the requester to choose the confidence threshold manually."
    ],
    "correct_answer": {
      "step_1": "Send a random sample of data objects to human workers for labeling.",
      "step_2": "Train and validate a labeling model on the human-labeled data.",
      "step_3": "Run batch inference on the unlabeled data and auto-label objects whose confidence meets the threshold.",
      "step_4": "Send the remaining low-confidence objects to human workers."
    },
    "explanation": "AWS describes the cycle: a random sample goes to humans, the labeled data trains and validates a model, batch transform produces confidence scores and a threshold, objects that meet the threshold are auto-labeled, and low-confidence objects go to humans. Then the process repeats. Ground Truth sets the threshold to meet fixed accuracy targets (for example, 95% for classification); the requester doesn't set it, and it never auto-labels regardless of confidence."
  },
  // ---------------- Matching ----------------
  {
    "number": 484, "domain": 1, "task": "1.3", "question_type": "HOTSPOT_MATCH",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-post-training-bias-metric-di.html",
    "question": "Select the correct SageMaker Clarify metric for each description. Each metric should be selected one time or not at all. (Select three.)",
    "available_terms": ["Class imbalance (CI)", "Difference in proportions of labels (DPL)", "Disparate impact (DI)", "Root mean square error (RMSE)"],
    "descriptions": [
      { "description": "Compares how many training samples each facet has: (na − nd)/(na + nd)", "correct_term": "Class imbalance (CI)" },
      { "description": "Compares the rate of positive LABELS between facets in the training data: qa − qd", "correct_term": "Difference in proportions of labels (DPL)" },
      { "description": "Ratio of positive PREDICTION rates between facets after training, where 1 means parity", "correct_term": "Disparate impact (DI)" }
    ],
    "explanation": "CI counts group sizes and DPL compares observed label rates; both are pre-training metrics. DI is post-training: q'd/q'a, the ratio of the model's positive predictions, where 1 is demographic parity. RMSE is a regression error metric, not a bias metric."
  },
  {
    "number": 485, "domain": 3, "task": "3.1", "question_type": "HOTSPOT_MATCH",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html",
    "question": "Select the SageMaker AI inference option that BEST fits each workload. Each option should be selected one time or not at all. (Select four.)",
    "available_terms": ["Real-time inference", "Serverless inference", "Asynchronous inference", "Batch transform", "Multi-model endpoint"],
    "descriptions": [
      { "description": "Interactive app that needs consistently low latency, with steady traffic and a GPU model", "correct_term": "Real-time inference" },
      { "description": "A CPU model with long idle periods between traffic spurts, where cold starts are acceptable", "correct_term": "Serverless inference" },
      { "description": "Payloads up to 1 GB and processing up to one hour, with near-real-time responses and scale to zero", "correct_term": "Asynchronous inference" },
      { "description": "Score an entire dataset in S3 every night, with no persistent endpoint", "correct_term": "Batch transform" }
    ],
    "explanation": "AWS: real-time is for 'interactive, low latency requirements'. Serverless is 'ideal for workloads which have idle periods between traffic spurts and can tolerate cold starts', but it has no GPUs. Asynchronous is for 'large payload sizes (up to 1GB), long processing times (up to one hour), and near real-time latency requirements'. Batch transform is for large datasets 'when you don't need a persistent endpoint'. A multi-model endpoint is for many models, which none of these describes."
  },
  {
    "number": 486, "domain": 2, "task": "2.2", "question_type": "HOTSPOT_MATCH",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html",
    "question": "Select the SageMaker automatic model tuning strategy that matches each description. Each strategy should be selected one time or not at all. (Select four.)",
    "available_terms": ["Grid search", "Random search", "Bayesian optimization", "Hyperband"],
    "descriptions": [
      { "description": "Tries every combination of categorical values; the number of jobs is calculated automatically", "correct_term": "Grid search" },
      { "description": "Each job's values are independent of earlier results, so maximum concurrency doesn't hurt tuning", "correct_term": "Random search" },
      { "description": "Treats tuning as a regression problem and uses earlier results to choose the next values", "correct_term": "Bayesian optimization" },
      { "description": "Uses intermediate results to give more epochs to promising configurations and stop weak ones", "correct_term": "Hyperband" }
    ],
    "explanation": "These descriptions are straight from AWS's strategy page. Remember the traps: grid supports only categorical parameters; Hyperband only suits iterative algorithms that report metrics along the way, and it requires TrainingJobEarlyStoppingType = OFF."
  },
  {
    "number": 487, "domain": 2, "task": "2.3", "question_type": "HOTSPOT_MATCH",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-rules.html",
    "question": "Select the SageMaker Debugger built-in rule that detects each training problem. Each rule should be selected one time or not at all. (Select four.)",
    "available_terms": ["ExplodingTensor", "VanishingGradient", "Overtraining", "DeadRelu", "ClassImbalance"],
    "descriptions": [
      { "description": "Tensors contain NaN or infinite values", "correct_term": "ExplodingTensor" },
      { "description": "The mean absolute gradient drops below a threshold, so early layers stop learning", "correct_term": "VanishingGradient" },
      { "description": "Validation loss starts rising after the model stops improving with continued training", "correct_term": "Overtraining" },
      { "description": "A large share of ReLU activations in a layer are inactive", "correct_term": "DeadRelu" }
    ],
    "explanation": "These come from AWS's rule definitions: ExplodingTensor finds non-finite values; VanishingGradient finds gradients near zero; Overtraining finds a model that has stopped improving and starts to overfit; DeadRelu finds the share of inactive ReLUs above a threshold. ClassImbalance exists, but it describes data imbalance, not one of these symptoms."
  },
  {
    "number": 488, "domain": 1, "task": "1.1", "question_type": "HOTSPOT_MATCH",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
    "question": "Select the training data access option that BEST fits each situation. Each option should be selected one time or not at all. (Select four.)",
    "available_terms": ["File mode", "FastFile mode", "Amazon FSx for Lustre", "Amazon EFS", "S3 Transfer Acceleration"],
    "descriptions": [
      { "description": "Small dataset; the job uses SageMaker local mode and simply downloads the data before training", "correct_term": "File mode" },
      { "description": "Large S3 dataset read sequentially; start training without downloading everything; no VPC", "correct_term": "FastFile mode" },
      { "description": "Many jobs need hundreds of GB/s of throughput and millions of IOPS on data linked to S3", "correct_term": "Amazon FSx for Lustre" },
      { "description": "The data already lives on a shared NFS file system that EC2 preprocessing jobs write to", "correct_term": "Amazon EFS" }
    ],
    "explanation": "File mode is the default: it downloads the data first and works with local mode. FastFile streams S3 objects on demand behind a POSIX interface and works best for sequential reads. FSx for Lustre gives very high throughput and IOPS but needs a VPC. EFS requires that the data 'already reside in Amazon EFS' and also needs a VPC. Transfer Acceleration speeds up long-distance uploads and downloads; it isn't a training input mode."
  },
  {
    "number": 489, "domain": 1, "task": "1.3", "question_type": "HOTSPOT_MATCH",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/detect-PII.html",
    "question": "Select the AWS Glue Detect PII action that meets each requirement. Each action should be selected one time or not at all. (Select three.)",
    "available_terms": ["Redact detected text", "Partially redact detected text", "Apply cryptographic hash", "Enrich data with detection results"],
    "descriptions": [
      { "description": "Replace each SSN with a consistent, irreversible token so records can still be linked", "correct_term": "Apply cryptographic hash" },
      { "description": "Show only the last four digits of each phone number", "correct_term": "Partially redact detected text" },
      { "description": "Replace every detected email address with ******", "correct_term": "Redact detected text" }
    ],
    "explanation": "AWS lists these actions: redact (replace with a string you choose, ****** by default), partially redact (keep the ends visible or mask by regex), apply a SHA-256 cryptographic hash (the same input always gives the same output), and enrich (store the detected entities in a new column without masking anything)."
  },
  {
    "number": 490, "domain": 4, "task": "4.1", "question_type": "HOTSPOT_MATCH",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/monitoring-cloudwatch.html",
    "question": "Select the CloudWatch metric that answers each question. Each metric should be selected one time or not at all. (Select four.)",
    "available_terms": ["ModelLatency", "OverheadLatency", "ModelSetupTime", "ModelLoadingWaitTime", "Invocations"],
    "descriptions": [
      { "description": "How long the model container took to process the request", "correct_term": "ModelLatency" },
      { "description": "How much time SageMaker added outside the container (affected by payload size and auth)", "correct_term": "OverheadLatency" },
      { "description": "How long a serverless endpoint took to launch new compute (cold start)", "correct_term": "ModelSetupTime" },
      { "description": "How long a request waited for its model to be downloaded or loaded on a multi-model endpoint", "correct_term": "ModelLoadingWaitTime" }
    ],
    "explanation": "These come from AWS's metric definitions (all in microseconds). Total latency is overhead plus model latency (plus network). Invocations counts requests and doesn't measure time."
  },
  // ---------------- Case study: retail ----------------
  {
    "number": 491, "domain": 1, "task": "1.1", "case_id": "retail", "case_title": "Retail demand forecasting",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/glue-connections.html",
    "question": "[Case study] Which approach prepares a weekly joined dataset of RDS sales history and S3 product attributes with the LEAST operational overhead?",
    "options": {
      "A": "A cron job on Amazon EC2 that exports RDS to CSV and joins it with the Parquet files in pandas.",
      "B": "An AWS Glue connection to RDS, crawlers for both sources, and a scheduled Glue ETL (Spark) job that joins them and writes Parquet to S3.",
      "C": "Copy the Parquet files into RDS with AWS DMS and join them with SQL.",
      "D": "Load both sources into a provisioned Amazon Redshift cluster every week."
    },
    "correct_answer": "B",
    "explanation": "The case asks for managed, serverless preparation. A Glue connection lets crawlers and ETL jobs reach the RDS (JDBC) source, and a scheduled Spark job joins it with the S3 data. A needs a server. C goes the wrong direction. D adds a cluster to run."
  },
  {
    "number": 492, "domain": 2, "task": "2.1", "case_id": "retail", "case_title": "Retail demand forecasting",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html",
    "question": "[Case study] Which modeling approach BEST meets the forecasting requirements?",
    "options": {
      "A": "One ARIMA model per product.",
      "B": "Linear Learner regression on last week's sales.",
      "C": "Random Cut Forest on weekly sales.",
      "D": "One DeepAR model trained jointly on all 3,000 product series, with region as a cat feature."
    },
    "correct_answer": "D",
    "explanation": "There are thousands of related series, new products with little history, and planners want P10/P90. DeepAR trains one model across related series, outperforms ARIMA/ETS when there are hundreds of them, can forecast new similar series, and produces quantiles. A fits each product separately, so new products have almost no history. B gives single numbers. C detects anomalies."
  },
  {
    "number": 493, "domain": 1, "task": "1.1", "case_id": "retail", "case_title": "Retail demand forecasting",
    "source": "https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html",
    "question": "[Case study] The team wants to reread the same clickstream events several times over the next few weeks while it experiments with features. What should it change on the Kinesis data stream?",
    "options": {
      "A": "Increase the data retention period (from the 24-hour default, up to 365 days).",
      "B": "Add enhanced fan-out consumers.",
      "C": "Switch to Amazon Data Firehose and replay from it.",
      "D": "Double the number of shards."
    },
    "correct_answer": "A",
    "explanation": "Records stay readable only for the retention period, which is 24 hours by default and can be increased to 8,760 hours. Longer retention lets consumers reread weeks of data. B and D add throughput, not history. Firehose delivers data and can't replay it."
  },
  // ---------------- Case study: bank ----------------
  {
    "number": 494, "domain": 1, "task": "1.3", "case_id": "bank", "case_title": "Card fraud model",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/detect-PII.html",
    "question": "[Case study] How should the identifiers in the dispute notes be handled before training?",
    "options": {
      "A": "Use AWS Glue Detect PII with the redact action so every identifier becomes ******.",
      "B": "Use Amazon Macie to scan the bucket. Macie masks the values it finds.",
      "C": "Use AWS Glue Detect PII with the cryptographic hash (SHA-256) action on the detected identifiers.",
      "D": "Drop the dispute notes column entirely."
    },
    "correct_answer": "C",
    "explanation": "Real identifiers must not appear, but transactions must stay linkable to the same customer. Hashing gives the same output for the same input and can't be reversed. A removes identifiers but makes every value identical, so records can't be linked. B finds and reports sensitive data; it doesn't mask anything. D throws away useful text and the ability to link records."
  },
  {
    "number": 495, "domain": 2, "task": "2.3", "case_id": "bank", "case_title": "Card fraud model",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/xgboost-tuning.html",
    "question": "[Case study] Which evaluation focus BEST matches the bank's costs?",
    "options": {
      "A": "Maximize accuracy.",
      "B": "Maximize recall on the fraud class, accepting lower precision.",
      "C": "Maximize precision on the fraud class, accepting lower recall.",
      "D": "Minimize RMSE."
    },
    "correct_answer": "B",
    "explanation": "A missed fraud (false negative) costs $4,000, while a false alarm costs a phone call. Recall measures how much real fraud is caught. With 0.5% fraud, A is misleading, because always predicting 'not fraud' scores 99.5%. C optimizes the cheap mistake. D is a regression metric. (XGBoost can also use scale_pos_weight ≈ negatives/positives for the imbalance.)"
  },
  {
    "number": 496, "domain": 2, "task": "2.1", "case_id": "bank", "case_title": "Card fraud model",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-shapley-values.html",
    "question": "[Case study] How can the bank meet the regulator's explanation requirement for the accurate XGBoost model it already has?",
    "options": {
      "A": "Generate SageMaker Clarify SHAP attributions for each declined transaction.",
      "B": "Turn on SageMaker Model Monitor data quality monitoring.",
      "C": "Add SageMaker Debugger rules to the training job.",
      "D": "Report the model's overall AUC to each customer."
    },
    "correct_answer": "A",
    "explanation": "Clarify's Shapley-based attributions can be 'provided for specific predictions', which explains one customer's decline, and also at a global level. B and C monitor data and training. D is one number for the whole model, not an explanation of a single decision."
  },
  {
    "number": 497, "domain": 3, "task": "3.1", "case_id": "bank", "case_title": "Card fraud model",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/shadow-tests.html",
    "question": "[Case study] How should the new model be evaluated on live traffic without affecting customers?",
    "options": {
      "A": "Deploy it as a second production variant receiving 10% of traffic.",
      "B": "Deploy it to a serverless endpoint and copy requests to it with AWS Lambda.",
      "C": "Run a shadow test: add the new model as a shadow variant on the existing real-time endpoint, so it receives copies of requests while only the production variant's responses are returned.",
      "D": "Use blue/green deployment with canary traffic shifting."
    },
    "correct_answer": "C",
    "explanation": "A shadow test sends a copy of live requests to the shadow variant 'within the same endpoint', and 'only the responses of the production variant are returned.' A and D show the new model's answers to real customers. B adds custom plumbing, and shadow tests aren't supported on serverless endpoints."
  },
  // ---------------- Case study: clinic ----------------
  {
    "number": 498, "domain": 1, "task": "1.2", "case_id": "clinic", "case_title": "Hospital X-ray lesions",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management.html",
    "question": "[Case study] Which Ground Truth workforce should label the images?",
    "options": {
      "A": "A vendor-managed workforce from AWS Marketplace.",
      "B": "A public crowdsourced workforce.",
      "C": "A private workforce of the network's radiologists, managed with Amazon Cognito or the hospital's OIDC identity provider.",
      "D": "No workforce. Use automated data labeling only."
    },
    "correct_answer": "C",
    "explanation": "Only the network's own radiologists may see the images, which is exactly what a private workforce is for. A and B send patient images to outside people. D isn't possible: automated labeling still starts with human labels, and the next question covers its minimum."
  },
  {
    "number": 499, "domain": 1, "task": "1.2", "case_id": "clinic", "case_title": "Hospital X-ray lesions",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-automated-labeling.html",
    "question": "[Case study] The team wants to cut labeling effort with Ground Truth automated data labeling for this semantic segmentation job. What applies?",
    "options": {
      "A": "It works, and it will auto-label all 900 images after 50 human labels.",
      "B": "It isn't available: automated labeling needs at least 1,250 objects (AWS suggests 5,000), and the hospital has 900 images.",
      "C": "It isn't available, because semantic segmentation is never supported.",
      "D": "It works only with a custom task template."
    },
    "correct_answer": "B",
    "explanation": "Semantic segmentation IS one of the four supported task types, so C is false. But 'the minimum number of objects allowed for automated data labeling is 1,250', and the hospital has 900. A invents a rule. D is backwards: custom task types aren't supported."
  },
  {
    "number": 500, "domain": 2, "task": "2.1", "case_id": "clinic", "case_title": "Hospital X-ray lesions",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "[Case study] Which SageMaker AI built-in algorithm type fits the goal of measuring lesion AREA?",
    "options": {
      "A": "Object detection",
      "B": "Image classification",
      "C": "Semantic segmentation",
      "D": "Random Cut Forest"
    },
    "correct_answer": "C",
    "explanation": "Measuring area needs a label on every pixel, which is what semantic segmentation provides (AWS: 'tag every pixel of an image individually with a category'). A draws boxes, which overstate irregular shapes. B gives one label per image. D isn't a vision algorithm."
  },
  // ---------------- Case study: saas ----------------
  {
    "number": 501, "domain": 3, "task": "3.1", "case_id": "saas", "case_title": "Per-customer models",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/multi-model-endpoints.html",
    "question": "[Case study] What is the MOST cost-effective way to host the 1,500 standard customer models?",
    "options": {
      "A": "One real-time endpoint per customer.",
      "B": "A multi-model endpoint that loads models from S3 on demand into the shared XGBoost container.",
      "C": "One serverless endpoint per customer.",
      "D": "One model trained on all customers' data."
    },
    "correct_answer": "B",
    "explanation": "Multi-model endpoints are 'ideal for hosting a large number of models that use the same ML framework on a shared serving container', and the case accepts occasional cold starts. A is 1,500 mostly idle endpoints. C runs into the 50-endpoint-per-Region limit for serverless. D changes the product."
  },
  {
    "number": 502, "domain": 4, "task": "4.1", "case_id": "saas", "case_title": "Per-customer models",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html",
    "question": "[Case study] How can the company meet the enterprise customer's Model Monitor requirement?",
    "options": {
      "A": "Turn on Model Monitor for that customer's model on the multi-model endpoint.",
      "B": "Host the enterprise customer's model on its own real-time endpoint with data capture enabled, and attach Model Monitor schedules to it.",
      "C": "Host it on a serverless endpoint with data capture.",
      "D": "Use AWS CloudTrail to monitor drift."
    },
    "correct_answer": "B",
    "explanation": "AWS: Model Monitor 'currently supports only endpoints that host a single model and does not support monitoring multi-model endpoints.' So that one model needs its own real-time endpoint with data capture. Serverless doesn't support data capture or Model Monitor. CloudTrail logs API calls, not data drift."
  },
  {
    "number": 503, "domain": 4, "task": "4.2", "case_id": "saas", "case_title": "Per-customer models",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/interface-vpc-endpoint.html",
    "question": "[Case study] How should the application servers reach the endpoints while meeting the network requirement?",
    "options": {
      "A": "Add a NAT gateway to the private subnets.",
      "B": "Create an S3 gateway endpoint.",
      "C": "Create an interface VPC endpoint (AWS PrivateLink) for SageMaker Runtime, with private DNS enabled.",
      "D": "Move the application servers to public subnets."
    },
    "correct_answer": "C",
    "explanation": "An interface endpoint lets the VPC call SageMaker Runtime 'without using an internet gateway, NAT device, VPN connection, or Direct Connect.' A and D route traffic over the internet path. B covers S3 only."
  }
].map(q => ({ topic: "Topic 8 - C01 Question Types", origin: "written-c01", c01: true, hard: true, ...q, ...(q.case_id ? { case_text: CASE_TEXT[q.case_id] } : {}) })));
