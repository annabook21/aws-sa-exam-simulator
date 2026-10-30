// MLA-C01 FINAL MOCK (439-478). Written by Claude on 2026-10-30. HELD OUT: these 40 questions never appear in any
// practice mode (simulator pools, readiness check, Triple Shot). They appear only in the simulator's one-time Final Mock,
// so its score reflects reasoning on unseen questions. Domain mix follows the C01 weights (11/11/9/9).
// Unless marked "concept", each was written after reading the AWS documentation page in its "source" field.
EXAM_DATA.push(...[
  // ---------- Domain 1 ----------
  {
    "number": 439, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html",
    "question": "A bug in a feature-engineering consumer corrupted features computed from a Kinesis data stream over the last 3 days. The team wants to fix the bug and reprocess those 3 days from the stream itself, and to be able to do the same in the future. The stream uses default settings. What should they do?",
    "options": {
      "A": "Nothing. Kinesis Data Streams keeps data for 30 days by default.",
      "B": "Increase the stream's retention period (it can go up to 365 days). Data older than the current 24-hour default is already gone, so recover these 3 days from another copy, such as a raw S3 archive.",
      "C": "Replay the 3 days from the Amazon Data Firehose delivery stream.",
      "D": "Add shards so that older data becomes available again."
    },
    "correct_answer": "B",
    "explanation": "The default retention is 24 hours and can be increased to 8,760 hours (365 days). Raising it now protects future replays, but records already older than 24 hours have expired, so the past 3 days must come from another copy. A is wrong: the default is 24 hours. C: Firehose delivers data and has no replay. D: shards add throughput, not history."
  },
  {
    "number": 440, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "question": "An ML pipeline writes intermediate feature files to Amazon S3. They're read about once a month, need millisecond access, and can be fully regenerated from raw data in a few hours if lost. Which storage class is LOWEST cost while meeting the needs?",
    "options": {
      "A": "S3 Standard",
      "B": "S3 Glacier Flexible Retrieval",
      "C": "S3 Standard-IA",
      "D": "S3 One Zone-IA"
    },
    "correct_answer": "D",
    "explanation": "AWS recommends One Zone-IA 'if you can re-create the data if the Availability Zone fails.' It gives millisecond access for infrequently read data at a lower price than Standard-IA, because it stores data in a single Availability Zone. C also works, but it costs more for resilience you don't need. B needs a restore before data can be read. A is priced for frequent access."
  },
  {
    "number": 441, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
    "question": "A training job reads a 400 GB dataset of large files sequentially from an Amazon S3 prefix. Startup is slow because File mode downloads everything first. The team can't configure a VPC for training. Which change fits BEST?",
    "options": {
      "A": "Use FastFile mode.",
      "B": "Mount Amazon FSx for Lustre.",
      "C": "Mount Amazon EFS.",
      "D": "Use a larger instance with more EBS storage."
    },
    "correct_answer": "A",
    "explanation": "FastFile streams S3 objects on demand through normal file paths, so training starts without a full download, and it 'works best when data is read sequentially'. That matches this case. B and C both require the training job to connect to a VPC, which the team can't do. D still downloads all 400 GB first."
  },
  {
    "number": 442, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-concepts.html",
    "question": "To build a churn training set, each label row must use the feature values that existed at that row's timestamp, not today's values, to avoid leaking future information. The features live in a SageMaker Feature Store feature group with both stores enabled. Where should the training set come from?",
    "options": {
      "A": "The online store, using GetRecord for each customer.",
      "B": "Fresh feature values recomputed today from the source systems.",
      "C": "The offline store's historical records, selecting for each label the latest record at or before the label's event time (a point-in-time join).",
      "D": "The online store, after waiting for all late records to arrive."
    },
    "correct_answer": "C",
    "explanation": "The offline store keeps every historical record with its event time, so you can pick the value that was current as of each label's timestamp. The online store keeps only the latest record per ID (A, D), which would leak values from after the label time into training. B leaks the future even more directly."
  },
  {
    "number": 443, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataExport.HowItWorks.html",
    "question": "A team already took a full export of a large DynamoDB table to Amazon S3. Each day they need only the changes since the previous day for retraining, at the lowest cost and without affecting the table. What should they use?",
    "options": {
      "A": "DynamoDB incremental exports to S3.",
      "B": "A full export every day.",
      "C": "A daily Scan with a filter on a last_modified attribute.",
      "D": "AWS Database Migration Service with a full-load task every day."
    },
    "correct_answer": "A",
    "explanation": "DynamoDB export to S3 supports 'both full and incremental data'. Incremental exports are charged on the data processed for the time window, and they don't consume read capacity. B exports and pays for the whole table every day. C consumes read capacity on the live table. D reloads everything."
  },
  {
    "number": 444, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "question": "In SageMaker Data Wrangler, a categorical column named payment_type has 3% missing values. The engineer applies the Impute missing transform. What value does Data Wrangler use for this categorical column?",
    "options": {
      "A": "The mean of the column.",
      "B": "The median of the column.",
      "C": "A random category.",
      "D": "The most frequent value in the column."
    },
    "correct_answer": "D",
    "explanation": "AWS: 'For categorical data, Data Wrangler imputes missing values using the most frequent value in the column.' Mean and median (A, B) are the numeric options. To fill in a custom string instead, use the Fill missing transform."
  },
  {
    "number": 445, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/detect-PII.html",
    "question": "A 20 TB dataset with 300 columns must be checked to find WHICH columns contain PII before deciding how to mask them. The team wants to keep the scan's cost and time low. Which AWS Glue Detect PII setting fits?",
    "options": {
      "A": "Detect PII in each cell, using all available patterns.",
      "B": "Detect fields containing PII, with a sample portion and a detection threshold.",
      "C": "Apply a cryptographic hash to every column.",
      "D": "Use Amazon Macie on the AWS Glue job's logs."
    },
    "correct_answer": "B",
    "explanation": "AWS: 'Detect fields containing PII' scans 'a sample of rows... to keep costs and resources low while also identifying the fields where PII entities are found.' You set the sample portion and the share of rows that must match for a column to be flagged. A scans every row, which is thorough but expensive for a column-finding pass. C changes data before you know which columns need it. D doesn't scan the dataset."
  },
  {
    "number": 446, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/machine-learning.html",
    "question": "A FindMatches transform has been taught to recognize duplicate supplier records. Before deleting anything, data stewards want to REVIEW each group of suspected duplicates. How should the transform output be configured?",
    "options": {
      "A": "Output a copy of the table with duplicate rows removed.",
      "B": "Output only the rows that have no matches.",
      "C": "Output a copy of the input table plus a match_id column, where records with the same match_id are a match group.",
      "D": "Send matches to Amazon SNS."
    },
    "correct_answer": "C",
    "explanation": "FindMatches can output either a copy of the table with a match_id column (records that share a match_id match each other) or a copy with duplicates removed, keeping the record with the lowest primary key. For human review before deletion, use the match_id output and group by it. A deletes the duplicates before anyone looks. B and D aren't FindMatches output options."
  },
  {
    "number": 447, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-bias-metric-class-imbalance.html",
    "question": "A dataset has 2,000 members of facet a and 6,000 members of facet d. What is the class imbalance (CI)?",
    "options": {
      "A": "-0.5",
      "B": "0.5",
      "C": "0.33",
      "D": "-0.75"
    },
    "correct_answer": "A",
    "explanation": "CI = (na − nd)/(na + nd) = (2,000 − 6,000)/8,000 = −0.5. A negative value means facet d has more samples. B gets the sign wrong. C is 2,000/6,000. D is −6,000/8,000. Check the sign first: CI is positive when facet a is bigger and negative when facet d is bigger."
  },
  {
    "number": 448, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html",
    "question": "A data steward wants AWS to automatically suggest a starter set of data quality rules for a table that is already cataloged in the AWS Glue Data Catalog, with no code. Which option supports rule RECOMMENDATIONS?",
    "options": {
      "A": "AWS Glue Data Quality inside a Glue ETL job.",
      "B": "SageMaker Model Monitor.",
      "C": "Amazon Macie.",
      "D": "AWS Glue Data Quality on the Data Catalog table (Recommend rules)."
    },
    "correct_answer": "D",
    "explanation": "AWS's comparison table shows that 'Data Quality rule recommendations' are supported for the Data Catalog but NOT for ETL jobs, and you can 'get started with two clicks: Create Data Quality Rules → Recommend rules'. A can run rules but doesn't recommend them. B monitors deployed models. C finds sensitive data."
  },
  {
    "number": 449, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/interface-vpc-endpoint.html",
    "question": "A security team requires that a training container can make NO network calls at all, not even to the internet or to resources in the VPC. Training data must still be read from Amazon S3 and model artifacts written back. What should the engineer enable?",
    "options": {
      "A": "Inter-container traffic encryption.",
      "B": "Network isolation on the training job (optionally with a VPC configuration so that SageMaker's S3 transfers run through the VPC).",
      "C": "An S3 bucket policy that denies public access.",
      "D": "A security group that allows all outbound traffic."
    },
    "correct_answer": "B",
    "explanation": "With network isolation, 'the SageMaker AI container can't communicate with resources inside your VPC or make any network calls.' SageMaker itself still downloads input data and uploads artifacts using your execution role, outside the container. With a VPC configuration, those transfers run through your VPC. A encrypts traffic between nodes but doesn't block anything. C and D don't restrict what the container can call."
  },
  // ---------- Domain 2 ----------
  {
    "number": 450, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html",
    "question": "A single bakery wants to forecast its own daily sales from 3 years of history. It has ONE time series and no related series. Which approach does AWS guidance suggest may be MORE accurate?",
    "options": {
      "A": "DeepAR, because it always beats classical methods.",
      "B": "A standard forecasting method such as ARIMA or ETS.",
      "C": "k-means on the daily sales values.",
      "D": "Object2Vec embeddings of each day."
    },
    "correct_answer": "B",
    "explanation": "AWS: 'Although a DeepAR model trained on a single time series might work well, standard forecasting algorithms, such as ARIMA or ETS, might provide more accurate results. The DeepAR algorithm starts to outperform the standard methods when your dataset contains hundreds of related time series.' A's 'always' is the trap. C and D don't forecast."
  },
  {
    "number": 451, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html",
    "question": "A DeepAR model was trained with a cat feature that encodes region as 0–5. The business opens a new region and asks for forecasts with cat = 6. What happens, and what should the team do?",
    "options": {
      "A": "DeepAR places region 6 between regions 5 and 0 automatically.",
      "B": "Forecasts will be accurate, because cat values are ignored at inference.",
      "C": "DeepAR can forecast only for categories it saw during training. Retrain with data that includes the new region (or use a global model without cat).",
      "D": "Increase context_length so that the model learns the new region from its history."
    },
    "correct_answer": "C",
    "explanation": "AWS: 'All values from each categorical domain must be represented in the training dataset. That's because the DeepAR algorithm can forecast only for categories that have been observed during training.' Also, a model trained with cat must receive cat at inference, so B is wrong. A and D don't create the missing embedding for the new category."
  },
  {
    "number": 452, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/fact-machines.html",
    "question": "A streaming service wants to predict the star rating (1.0–5.0) a user would give a movie. The data is a very sparse user × movie matrix. Which configuration fits?",
    "options": {
      "A": "Factorization Machines in regression mode. The prediction is returned as a score.",
      "B": "Factorization Machines in multiclass mode with 5 classes.",
      "C": "Random Cut Forest.",
      "D": "Linear Learner trained on dense CSV with every user × movie pair one-hot encoded."
    },
    "correct_answer": "A",
    "explanation": "Factorization Machines handles high-dimensional sparse data such as recommendations. It supports binary classification or regression. AWS: 'For the regression problem, just a score is returned... For example, if Factorization Machines is used to predict a movie rating, score is the predicted rating value.' B: there is no multiclass mode. C detects anomalies. D explodes into a huge dense matrix and misses the user-movie interactions that FM learns."
  },
  {
    "number": 453, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "A parking operator wants to COUNT the cars in each camera frame and show where each car is. Outlines at the pixel level aren't needed. Which built-in algorithm type fits BEST?",
    "options": {
      "A": "Semantic segmentation",
      "B": "Image classification",
      "C": "Random Cut Forest",
      "D": "Object detection"
    },
    "correct_answer": "D",
    "explanation": "Object detection finds each instance and draws a box with a label, so counting the boxes counts the cars. B gives one label per image, so it can't count. A labels pixels by class: it shows where 'car' pixels are, but it doesn't separate one car from another, which makes counting hard, and it's more detail than needed. C isn't a vision algorithm."
  },
  {
    "number": 454, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/blazingtext.html",
    "question": "A team needs to train Word2Vec word embeddings with BlazingText on a very large corpus and wants to distribute training across MULTIPLE CPU instances. Which mode must they use?",
    "options": {
      "A": "supervised",
      "B": "batch_skipgram",
      "C": "cbow on a multi-GPU instance",
      "D": "skipgram on multiple GPU instances"
    },
    "correct_answer": "B",
    "explanation": "AWS's BlazingText table lists only Batch Skip-gram for multiple CPU instances: it 'allows faster training and distributed computation across multiple CPU nodes.' cbow and skipgram run on a single CPU or a single GPU instance. A is text classification, not Word2Vec."
  },
  {
    "number": 455, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html",
    "question": "A team wants a SageMaker tuning job to try EVERY combination of three categorical hyperparameters with 2, 3 and 4 possible values, each exactly once. Which strategy fits, and how many training jobs run?",
    "options": {
      "A": "Random search, 9 jobs",
      "B": "Bayesian optimization, 24 jobs",
      "C": "Grid search, 24 jobs",
      "D": "Hyperband, 9 jobs"
    },
    "correct_answer": "C",
    "explanation": "Grid search tries every combination, and 'only categorical parameters are supported.' The number of jobs is calculated automatically as the number of distinct combinations: 2 × 3 × 4 = 24. Random and Bayesian sample combinations, so they don't guarantee every combination exactly once. Hyperband reallocates epochs between configurations, so it doesn't run an exhaustive grid."
  },
  {
    "number": 456, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-warm-start.html",
    "question": "A previous tuning job maximized validation:auc. The team now wants a new tuning job that maximizes validation:f1 and reuses the earlier results through warm start. What happens?",
    "options": {
      "A": "Warm start isn't allowed, because the objective metric must be the same as in the parent jobs. Run a new tuning job without warm start.",
      "B": "Use TRANSFER_LEARNING, which allows a different objective metric.",
      "C": "Use IDENTICAL_DATA_AND_ALGORITHM, which converts AUC results to F1 automatically.",
      "D": "Warm start works if there are 10 or more parent jobs."
    },
    "correct_answer": "A",
    "explanation": "AWS's warm start restrictions: 'The objective metric used in the new tuning job must be the same as the objective metric used in the parent jobs.' TRANSFER_LEARNING allows different data, ranges and image versions, but not a different objective. D: a warm start job can have at most 5 parents."
  },
  {
    "number": 457, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-managed-spot-training.html",
    "question": "A team uses managed spot training with a SageMaker AI built-in algorithm that does NOT save checkpoints. They try to set MaxWaitTimeInSeconds to 4 hours. What should they expect?",
    "options": {
      "A": "It works. MaxWaitTimeInSeconds has no limit.",
      "B": "SageMaker automatically switches to On-Demand after 4 hours.",
      "C": "MaxWaitTimeInSeconds must be lower than MaxRuntimeInSeconds.",
      "D": "Built-in algorithms that don't checkpoint are limited to a MaxWaitTimeInSeconds of 3,600 seconds (60 minutes)."
    },
    "correct_answer": "D",
    "explanation": "AWS: 'SageMaker AI built-in algorithms and marketplace algorithms that do not checkpoint are currently limited to a MaxWaitTimeInSeconds of 3600 seconds (60 minutes).' B: managed spot training never falls back to On-Demand. C is backwards: MaxWait must be LARGER than MaxRuntime."
  },
  {
    "number": 458, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-approve.html",
    "question": "With a SageMaker project template's CI/CD, model version 7 was approved and deployed, and now it's misbehaving. Version 6 is still Approved. What is the FASTEST supported rollback?",
    "options": {
      "A": "Delete the endpoint and recreate it by hand from version 6.",
      "B": "Change version 7's status from Approved to Rejected. This starts CI/CD to deploy the latest version that is still Approved (version 6).",
      "C": "Register version 6 again as a new version 8.",
      "D": "Set version 7 to PendingManualApproval."
    },
    "correct_answer": "B",
    "explanation": "AWS: 'Approved to Rejected – initiates CI/CD to deploy the latest model version with an Approved status.' That's a built-in rollback. A is manual and causes downtime. C adds an unnecessary version. D isn't one of the documented transitions that triggers a deployment."
  },
  {
    "number": 459, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html",
    "question": "A large Bedrock model gives excellent answers for a support use case but is too slow and expensive at scale. The team has many example customer prompts but few hand-written answers. They want a smaller, faster model that approaches the large model's quality. Which customization fits?",
    "options": {
      "A": "Supervised fine-tuning of the large model.",
      "B": "A knowledge base for RAG.",
      "C": "Distillation, with the large model as the teacher and a smaller model as the student.",
      "D": "Provisioned Throughput for the large model."
    },
    "correct_answer": "C",
    "explanation": "AWS: distillation transfers knowledge 'from a larger more intelligent model (known as teacher) to a smaller, faster, and cost-efficient model (known as student).' Bedrock generates the teacher's responses to your prompts and fine-tunes the student on them, so you don't need hand-written answers. A keeps the big, slow model. B adds facts, not speed. D buys capacity but doesn't reduce the cost per answer."
  },
  {
    "number": 460, "domain": 2, "task": "2.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-post-training-bias-metric-di.html",
    "question": "SageMaker Clarify reports disparate impact (DI) = 1.25 for a hiring model, with facet a as the majority group and facet d as the minority group. What does this mean?",
    "options": {
      "A": "Facet d receives positive predictions at 1.25× the rate of facet a. Facet d is favored (Clarify calls this negative bias).",
      "B": "Facet a is favored, because DI is above 1.",
      "C": "The model is 125% accurate for facet d.",
      "D": "The training labels show a 0.25 difference in approval rates."
    },
    "correct_answer": "A",
    "explanation": "DI = q'd / q'a. 'Values greater than 1 indicate that facet d has a higher proportion of predicted positive outcomes than facet a', which Clarify calls negative bias. Exactly 1 is parity; below 1 favors facet a. B reverses the direction. C confuses DI with accuracy. D describes DPL, which is based on labels."
  },
  // ---------- Domain 3 ----------
  {
    "number": 461, "domain": 3, "task": "3.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html",
    "question": "A video-analysis model receives payloads of up to 500 MB, and each request takes up to 20 minutes to process. Requests arrive in irregular bursts, and the endpoint should scale to zero when idle. Which inference option fits?",
    "options": {
      "A": "Real-time inference",
      "B": "Asynchronous inference",
      "C": "Serverless inference",
      "D": "Batch transform with a 24-hour schedule"
    },
    "correct_answer": "B",
    "explanation": "AWS: asynchronous inference queues requests and is ideal for 'large payload sizes (up to 1GB), long processing times (up to one hour), and near real-time latency requirements', and it can scale to zero. A is built for low-latency interactive requests, not 20-minute jobs. C doesn't fit payloads and processing times this large. D waits for a schedule instead of handling requests as they arrive."
  },
  {
    "number": 462, "domain": 3, "task": "3.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html",
    "question": "An internal tool calls a vision model only a few times an hour, and cold starts are acceptable. However, the model REQUIRES a GPU for acceptable latency. Which option fits?",
    "options": {
      "A": "Serverless inference with 6 GB of memory.",
      "B": "Serverless inference with provisioned concurrency.",
      "C": "A multi-model endpoint on serverless inference.",
      "D": "A real-time endpoint on a GPU instance (with auto scaling)."
    },
    "correct_answer": "D",
    "explanation": "AWS lists GPUs among the features NOT supported by serverless inference, along with multi-model endpoints, VPC configuration, data capture and Model Monitor. So A, B and C are all out, even though the sporadic traffic sounds like a serverless use case. That's the trap. A GPU real-time endpoint is required."
  },
  {
    "number": 463, "domain": 3, "task": "3.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html",
    "question": "A CPU model on a serverless endpoint gets a predictable burst of traffic every weekday at 9:00 AM, and the cold starts at that time break the latency SLA. The rest of the day is quiet. What is the MOST cost-effective fix?",
    "options": {
      "A": "Add provisioned concurrency to the serverless endpoint, scheduled with Application Auto Scaling for the morning burst.",
      "B": "Switch to a real-time endpoint that runs 24/7.",
      "C": "Increase the memory size to 6 GB.",
      "D": "Switch to asynchronous inference."
    },
    "correct_answer": "A",
    "explanation": "AWS: provisioned concurrency is 'a cost-effective option when you have predictable bursts in your traffic.' It keeps the endpoint warm, and it can be scaled on a schedule with Application Auto Scaling. B pays for idle hours. C may speed up processing but doesn't remove cold starts. D changes how the API behaves and still has scaling delays."
  },
  {
    "number": 464, "domain": 3, "task": "3.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/batch-transform.html",
    "question": "Every night, 50 million customer records in Amazon S3 must be scored. Results must be traceable to each input customer ID, and no endpoint should run during the day. What should the ML engineer use?",
    "options": {
      "A": "A real-time endpoint called in a loop from an AWS Lambda function.",
      "B": "Asynchronous inference with one request per record.",
      "C": "A batch transform job that associates input records with predictions, writing outputs to S3.",
      "D": "A serverless endpoint called 50 million times."
    },
    "correct_answer": "C",
    "explanation": "AWS: use batch transform to 'get inferences from large datasets', 'run inference when you don't need a persistent endpoint', and 'associate input records with inferences.' It starts instances, splits the work across them, writes .out files and shuts down when done. A, B and D send 50 million individual requests, which is slow and costly."
  },
  {
    "number": 465, "domain": 3, "task": "3.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/multi-model-endpoints.html",
    "question": "A SaaS company has 2,000 per-customer XGBoost models. Most are invoked rarely, and occasional first-call latency is acceptable. Hosting each model on its own endpoint is too expensive. What should it use?",
    "options": {
      "A": "2,000 serverless endpoints.",
      "B": "A multi-model endpoint that loads models from S3 on demand into a shared container.",
      "C": "A single model trained on all customers.",
      "D": "Inference pipelines."
    },
    "correct_answer": "B",
    "explanation": "AWS: multi-model endpoints are 'ideal for hosting a large number of models that use the same ML framework on a shared serving container.' SageMaker loads models dynamically and caches them, and 'your application should be tolerant of occasional cold start-related latency penalties.' A runs into account limits (50 serverless endpoints per Region) and is a lot to manage. C changes the product, since each customer needs its own model. D chains containers; it doesn't host many models."
  },
  {
    "number": 466, "domain": 3, "task": "3.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-add-code-define.html",
    "question": "An LLM endpoint uses target tracking on SageMakerVariantInvocationsPerInstance, but it scales out too slowly when concurrent requests spike. What change helps it react FASTER?",
    "options": {
      "A": "Increase ScaleInCooldown.",
      "B": "Switch to step scaling on CPUUtilization with a 5-minute period.",
      "C": "Turn off auto scaling and keep the maximum instance count.",
      "D": "Use the high-resolution predefined metric SageMakerVariantConcurrentRequestsPerModelHighResolution."
    },
    "correct_answer": "D",
    "explanation": "AWS: standard metrics such as InvocationsPerInstance 'emit data once every minute', but the high-resolution concurrency metrics 'emit data every 10 seconds', so the policy 'reacts by scaling out much more quickly.' They also count requests queued inside the container. A slows scale-in, not scale-out. B is even slower. C works but wastes money."
  },
  {
    "number": 467, "domain": 3, "task": "3.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/inference-recommender.html",
    "question": "Before deploying a new model, a team must choose the instance type and configuration that meets its latency target at the LOWEST cost, based on actual load tests rather than guesses. What should it use?",
    "options": {
      "A": "SageMaker Inference Recommender",
      "B": "AWS Compute Optimizer for EC2",
      "C": "SageMaker Model Monitor",
      "D": "SageMaker Clarify"
    },
    "correct_answer": "A",
    "explanation": "AWS: Inference Recommender automates 'load testing and model tuning across SageMaker AI ML instances' to find the endpoint configuration that 'delivers the best performance at the lowest cost.' It considers instance count, container parameters, concurrency and memory size. B looks at EC2 usage history, not SageMaker model load tests. C watches drift. D explains predictions and measures bias."
  },
  {
    "number": 468, "domain": 3, "task": "3.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/build-and-manage-steps-types.html",
    "question": "In a SageMaker AI pipeline, a model should be registered ONLY if evaluation accuracy is at least 0.90. Otherwise, the pipeline must stop with a clear error message. Which steps should be used?",
    "options": {
      "A": "A Lambda step that deletes bad models after they are registered.",
      "B": "A Callback step that waits for a human to check the score.",
      "C": "A Condition step that runs the RegisterModel/Model step when the condition is true, and a Fail step with a custom message when it is false.",
      "D": "A QualityCheck step only."
    },
    "correct_answer": "C",
    "explanation": "A Condition step evaluates step properties (such as the evaluation metric) to choose the next steps. A Fail step 'stop[s] an Amazon SageMaker Pipelines execution when a desired condition or state is not achieved' and lets you write a custom error message. A cleans up after the fact. B adds a manual wait. D checks for data or model quality drift against a baseline; it doesn't gate registration on accuracy."
  },
  {
    "number": 469, "domain": 3, "task": "3.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/build-and-manage-steps-types.html",
    "question": "A SageMaker AI pipeline must wait for a data validation process that runs in an on-premises system. When that system finishes, it should tell the pipeline whether to continue. Which step type fits?",
    "options": {
      "A": "A Condition step",
      "B": "A Callback step: Pipelines sends a token to an Amazon SQS queue, and the external process reports success or failure with that token.",
      "C": "A Transform step",
      "D": "A Fail step"
    },
    "correct_answer": "B",
    "explanation": "AWS: Callback steps add 'processes and AWS services into your workflow that aren't directly provided by Amazon SageMaker Pipelines.' Pipelines sends a message with a token to SQS and waits, and the external process calls back with the token when it finishes. The same pattern integrates AWS Glue jobs. A checks values already inside the pipeline. C runs batch transform. D stops the pipeline."
  },
  // ---------- Domain 4 ----------
  {
    "number": 470, "domain": 4, "task": "4.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality.html",
    "question": "A team wants Model Monitor to alert when a deployed classifier's ACCURACY drops. Data capture is already enabled. What else is required?",
    "options": {
      "A": "Nothing. Model Monitor computes accuracy from the captured inputs alone.",
      "B": "A data quality monitoring schedule.",
      "C": "A feature attribution drift monitor.",
      "D": "A model quality baseline and monitoring schedule, plus Ground Truth labels uploaded to S3 that Model Monitor merges with the captured predictions."
    },
    "correct_answer": "D",
    "explanation": "AWS: model quality monitoring 'merges data that is captured... with actual labels that you store in an Amazon S3 bucket, and then compares the predictions with the actual labels.' Without true labels there's nothing to compute accuracy against, so A fails. B watches input data drift, not accuracy. C watches whether feature importance shifts."
  },
  {
    "number": 471, "domain": 4, "task": "4.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html",
    "question": "A team deployed a model to a SageMaker serverless endpoint and now wants Model Monitor data quality monitoring with data capture. What should they do?",
    "options": {
      "A": "Move the model to a real-time endpoint, because serverless inference doesn't support data capture or Model Monitor.",
      "B": "Enable data capture in the serverless endpoint configuration.",
      "C": "Turn on provisioned concurrency first.",
      "D": "Use a multi-model endpoint on serverless inference."
    },
    "correct_answer": "A",
    "explanation": "AWS lists 'data capture, multiple production variants, Model Monitor' among the features that serverless inference doesn't support. (Multi-model endpoints aren't supported on serverless either, and Model Monitor doesn't support multi-model endpoints.) A real-time endpoint with data capture is required. B isn't possible. C doesn't add features."
  },
  {
    "number": 472, "domain": 4, "task": "4.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html",
    "question": "A team needs to detect when the distribution of incoming feature values drifts from what the model was trained on, for example when average transaction amounts shift. True labels arrive months later. Which monitor and baseline should they use?",
    "options": {
      "A": "Model quality monitoring, using the training labels as the baseline.",
      "B": "A CloudWatch alarm on Invocations.",
      "C": "Data quality monitoring, with a baseline (statistics and constraints) computed from the training dataset.",
      "D": "AWS CloudTrail."
    },
    "correct_answer": "C",
    "explanation": "Data quality monitoring compares live captured inputs against a baseline built 'from the dataset that was used to train the model', and it flags violations of the suggested constraints. It doesn't need labels, so it works before labels arrive. A needs fresh ground truth labels, which won't exist for months. B counts requests. D logs API calls."
  },
  {
    "number": 473, "domain": 4, "task": "4.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/monitoring-cloudwatch.html",
    "question": "Clients report that endpoint response times jumped after a change that sends much larger request payloads. In CloudWatch, ModelLatency is unchanged, but total latency rose. Which metric shows where the time went?",
    "options": {
      "A": "Invocation5XXErrors",
      "B": "OverheadLatency, the time SageMaker adds (which depends on factors such as payload size), measured as total response time minus ModelLatency",
      "C": "CPUUtilization",
      "D": "InvocationsPerInstance"
    },
    "correct_answer": "B",
    "explanation": "AWS splits latency into network, overhead and model latency. OverheadLatency is measured 'from the time SageMaker AI receives the request until it returns a response to the client, minus the ModelLatency', and it 'can vary depending on... request and response payload sizes.' Since model time didn't change, the increase is overhead. Both are measured in microseconds. A counts errors. C and D measure load, not the latency breakdown."
  },
  {
    "number": 474, "domain": 4, "task": "4.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/monitoring-cloudwatch.html",
    "question": "For a serverless endpoint, which CloudWatch metric directly measures the time it takes to launch new compute resources (cold start setup)?",
    "options": {
      "A": "Invocation4XXErrors",
      "B": "DiskUtilization",
      "C": "Invocations",
      "D": "ModelSetupTime"
    },
    "correct_answer": "D",
    "explanation": "AWS: ModelSetupTime is 'the time it takes to launch new compute resources for a serverless endpoint', and it depends on model size, download time and container start-up. (AWS also suggests watching OverheadLatency for cold starts.) A counts client errors. B measures disk space. C counts requests."
  },
  {
    "number": 475, "domain": 4, "task": "4.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/interface-vpc-endpoint.html",
    "question": "An application runs in private subnets with no internet gateway or NAT device. It must call InvokeEndpoint on a SageMaker AI endpoint without traffic leaving the AWS network. What should the network team create?",
    "options": {
      "A": "An interface VPC endpoint (AWS PrivateLink) for the SageMaker Runtime service in the application's VPC, with private DNS enabled.",
      "B": "An S3 gateway endpoint.",
      "C": "A NAT gateway.",
      "D": "A VPC peering connection to the SageMaker service VPC."
    },
    "correct_answer": "A",
    "explanation": "AWS: you can connect 'to Amazon SageMaker Runtime through an interface endpoint in your VPC instead of connecting over the internet', 'without using an internet gateway, NAT device, VPN connection, or Direct Connect.' With private DNS, the default runtime hostname resolves to the endpoint. (It must be enabled in the client's Availability Zone.) B covers S3 only. C sends traffic out through the internet path. D isn't how AWS services are reached."
  },
  {
    "number": 476, "domain": 4, "task": "4.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/interface-vpc-endpoint.html",
    "question": "A security team wants everyone using the VPC's SageMaker Runtime interface endpoint to be able to invoke ONLY the SageMaker endpoint named fraud-prod, and nothing else through that VPC endpoint. What should they attach?",
    "options": {
      "A": "An S3 bucket policy.",
      "B": "A security group that blocks port 443.",
      "C": "A VPC endpoint policy that allows sagemaker:InvokeEndpoint only on the fraud-prod endpoint ARN.",
      "D": "A KMS key policy."
    },
    "correct_answer": "C",
    "explanation": "A VPC endpoint policy sets which principals, actions and resources are allowed through that endpoint. AWS's own example allows only sagemaker:InvokeEndpoint on one endpoint ARN. Note: this limits traffic THROUGH the VPC endpoint only; to block calls made from outside the VPC, you also need identity-based policies. B would break all access. A and D control other resources."
  },
  {
    "number": 477, "domain": 4, "task": "4.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/monitoring-cloudwatch.html",
    "question": "On a multi-model endpoint, some requests are slow while others are fast. The team suspects those requests waited for their model to be downloaded and loaded. Which CloudWatch metrics confirm this?",
    "options": {
      "A": "OverheadLatency and Invocations",
      "B": "ModelLoadingWaitTime and ModelCacheHit",
      "C": "CPUReservation and GPUReservation",
      "D": "DiskUtilization only"
    },
    "correct_answer": "B",
    "explanation": "Multi-model endpoint metrics: ModelLoadingWaitTime is 'the interval of time that an invocation request has waited for the target model to be downloaded, loaded, or both', and ModelCacheHit's Average shows 'the ratio of requests for which the model was already loaded.' High wait times with a low cache-hit ratio confirm cold model loads. A is general. C applies to inference components. D is indirect."
  },
  {
    "number": 478, "domain": 4, "task": "4.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html",
    "question": "On a busy real-time endpoint with data capture enabled, Model Monitor reports have gaps: some periods have no captured requests, even though traffic was steady. What is a documented cause and fix?",
    "options": {
      "A": "Data capture works only on serverless endpoints. Switch to serverless.",
      "B": "The baseline is too old. Recreate it.",
      "C": "CloudTrail is turned off. Turn it on.",
      "D": "Data capture stops capturing requests when disk usage is high. Keep disk utilization below 75% (for example, with larger volumes, more instances or a lower capture percentage)."
    },
    "correct_answer": "D",
    "explanation": "AWS: 'To prevent impact to inference requests, Data Capture stops capturing requests at high levels of disk usage. We recommended that you keep your disk utilization below 75%.' A is backwards: serverless doesn't support data capture. B affects comparisons, not whether data gets captured. C records API calls, not inference payloads."
  }
].map(q => ({ topic: "Topic 7 - C01 Final Mock (held out)", origin: "written-c01", c01: true, mock: true, ...q })));
