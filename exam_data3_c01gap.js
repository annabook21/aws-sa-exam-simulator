// MLA-C01 gap questions (309+). Written by Claude to cover services and skills that the official MLA-C01 exam guide
// (Korean/Japanese/Chinese editions, plus the English v1.0 PDF) names but the original 145-question bank never tests.
// Each question was written after reading the AWS documentation page in its "source" field.
// origin "written-c01" questions appear only in C01 mode.
EXAM_DATA.push(...[
  {
    "number": 309, "domain": 3,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/neo.html",
    "question": "A company trained a PyTorch image classification model and must run it on thousands of ARM-based edge cameras with limited memory. The team does not want to hand-tune the model for each chip. Which approach should an ML engineer use?",
    "options": {
      "A": "Deploy the model to a SageMaker AI serverless endpoint and have each camera call it over the network.",
      "B": "Compile the model with SageMaker Neo for the target edge device, then deploy the compiled model and the Neo runtime to the cameras.",
      "C": "Run SageMaker Inference Recommender to choose the smallest edge instance type for the model.",
      "D": "Retrain the model with SageMaker Autopilot so that it produces a smaller model automatically."
    },
    "correct_answer": "B",
    "explanation": "Neo is AWS's compiler for models. It turns a trained model into code tuned for a specific chip, so the model can 'train once, run anywhere', including edge devices from ARM, Intel, Nvidia, Qualcomm and others. It can also quantize to INT8 or FP16 to shrink the model. Think of a translator rewriting a book for each country instead of asking every reader to learn the original language. A keeps the model in the cloud, so every camera needs a network round trip, and serverless endpoints have no GPU. C picks SageMaker AI instance types; it doesn't target edge devices. D builds new tabular models; it doesn't optimize an existing PyTorch vision model for hardware."
  },
  {
    "number": 310, "domain": 3,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/neo.html",
    "question": "An ML engineer must reduce the inference latency and memory footprint of a TensorFlow model that is already deployed on SageMaker AI, without retraining it. Which TWO actions are supported ways to do this? (Select TWO.)",
    "options": {
      "A": "Compile the model with SageMaker Neo for the endpoint's instance type.",
      "B": "Have Neo quantize the model parameters from FP32 to INT8 or FP16.",
      "C": "Increase the max_depth hyperparameter and redeploy.",
      "D": "Switch the endpoint from real-time to batch transform.",
      "E": "Enable SageMaker Model Monitor data capture."
    },
    "correct_answer": "AB",
    "explanation": "AWS says Neo can compile models for cloud instances as well as edge devices, and that it can optimize models with parameters in FP32 or quantized to INT8 or FP16. Quantization means storing numbers with fewer digits, like rounding prices to whole dollars: smaller and faster, slightly less precise. C is an XGBoost-style tree setting, would need retraining, and makes the model bigger. D removes real-time inference, which changes the use case instead of making the model faster. E only records requests and responses; it adds work rather than reducing latency."
  },
  {
    "number": 311, "domain": 4,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/role-manager.html",
    "question": "An ML administrator must give data scientists and MLOps engineers least-privilege IAM roles for common ML activities, without writing every policy by hand. The administrator wants to start from predefined personas in the SageMaker AI console. Which feature should the administrator use?",
    "options": {
      "A": "SageMaker Role Manager",
      "B": "IAM Access Analyzer policy generation",
      "C": "AWS Organizations service control policies",
      "D": "SageMaker Model Cards"
    },
    "correct_answer": "A",
    "explanation": "Role Manager builds persona-based IAM roles for ML work. It comes with 3 preconfigured personas (such as data scientist and MLOps) and predefined permissions for common ML activities, and you can add VPC and KMS settings. Picture a staffing agency's job-description templates: pick 'data scientist' and you get a ready-made, tightly scoped badge. B can draft policies from past CloudTrail activity, but it has no ML personas, and the question asks for console personas. C sets maximum limits across accounts; SCPs never grant permissions. D documents a model; it doesn't create roles. (Side note: AWS has closed Role Manager to new customers, but the C01 exam guide names it, so it's still fair game on C01.)"
  },
  {
    "number": 312, "domain": 4,
    "source": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights.html",
    "question": "A Lambda function preprocesses features before it calls a SageMaker AI endpoint. Latency spikes happen at random. The team needs per-invocation system metrics, including CPU time, memory, disk and network use, plus cold-start information, with minimal code changes. What should the team do?",
    "options": {
      "A": "Turn on AWS X-Ray active tracing for the function.",
      "B": "Use AWS CloudTrail data events for Lambda invocations.",
      "C": "Query the function's log group with CloudWatch Logs Insights.",
      "D": "Turn on CloudWatch Lambda Insights by adding the Lambda Insights extension layer to the function."
    },
    "correct_answer": "D",
    "explanation": "Lambda Insights is installed as a Lambda layer (an extension). It collects system-level metrics (CPU time, memory, disk, network) and diagnostics such as cold starts, emitting one performance log event per invocation. It's like a fitness tracker strapped to the function. X-Ray (A) traces a request's path and timing across services, but it doesn't report the function's memory or disk use. Logs Insights (C) can only search logs that already exist; it doesn't create these system metrics. CloudTrail (B) records who invoked what, not how the function performed."
  },
  {
    "number": 313, "domain": 4,
    "source": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html",
    "question": "A SageMaker AI endpoint writes its container logs to CloudWatch Logs. An engineer must find out, within minutes, how many requests in the last 24 hours logged 'ModelError', grouped by hour. The team doesn't want to export logs or build new infrastructure. What should the engineer use?",
    "options": {
      "A": "Export the log group to Amazon S3 and query it with Amazon Athena.",
      "B": "Run a CloudWatch Logs Insights query on the endpoint's log group that filters for 'ModelError' and counts by hour.",
      "C": "Create a SageMaker Model Monitor model quality schedule.",
      "D": "Stream the logs to Amazon OpenSearch Service and build a dashboard."
    },
    "correct_answer": "B",
    "explanation": "CloudWatch Logs Insights lets you search and analyze log data interactively, with its own query language (plus PPL and SQL), right where the logs already are. It's like Ctrl+F with a calculator built in. A and D both work in the end, but they need exporting or new infrastructure, which the question rules out. C measures prediction quality against ground-truth labels; it doesn't count error log lines."
  },
  {
    "number": 314, "domain": 1,
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html",
    "question": "Field teams on four continents upload several gigabytes of drone images each day to one central S3 bucket in us-east-1 for model training. Uploads from Asia and South America are slow over the public internet. Which change will MOST directly speed up these long-distance uploads?",
    "options": {
      "A": "Enable S3 Transfer Acceleration on the bucket and have the teams upload to the bucket's s3-accelerate endpoint.",
      "B": "Turn on S3 Cross-Region Replication to buckets in each continent.",
      "C": "Put an Amazon CloudFront distribution in front of the bucket with caching enabled for GET requests.",
      "D": "Change the bucket's storage class to S3 Express One Zone."
    },
    "correct_answer": "A",
    "explanation": "AWS lists exactly this use: customers uploading to a central bucket from around the world, moving gigabytes to terabytes across continents. Transfer Acceleration sends the upload into the nearest CloudFront edge location, and from there it travels to S3 over AWS's optimized network. Think of getting on a highway at the on-ramp nearest you instead of driving local roads the whole way. B copies objects after they are already in S3, so it does nothing for the slow upload. C caches downloads (GET); the problem is uploads. D is a low-latency storage class in a single Availability Zone; it doesn't fix the long network path."
  },
  {
    "number": 315, "domain": 1,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/cdf-training.html",
    "question": "An ML engineer will train the SageMaker AI built-in Linear Learner algorithm on 2 TB of numeric data. The engineer wants to use Pipe input mode and the data format that the built-in algorithms read most efficiently. Which format should the engineer convert the data to?",
    "options": {
      "A": "JSON Lines (application/jsonlines)",
      "B": "RecordIO-protobuf (application/x-recordio-protobuf)",
      "C": "Apache Avro",
      "D": "LibSVM (text/libsvm)"
    },
    "correct_answer": "B",
    "explanation": "AWS lists application/x-recordio-protobuf as a supported content type for Linear Learner, K-Means, k-NN, PCA, RCF, Factorization Machines, LDA, NTM and seq2seq. It stores each record as compact binary floats, like vacuum-packing clothes so more fit through the pipe. Pipe mode streams data straight from S3 instead of copying it to disk first. A (JSON Lines) is the format for BlazingText and DeepAR, not Linear Learner. C (Avro) is a common data-lake format, but it isn't in AWS's list of built-in algorithm content types. D (LibSVM) is listed only for XGBoost."
  },
  {
    "number": 316, "domain": 1,
    "source": "https://docs.aws.amazon.com/ebs/latest/userguide/provisioned-iops.html",
    "question": "A self-managed feature database on Amazon EC2 serves features to a real-time model. It needs consistent, sub-millisecond storage latency and a guaranteed high IOPS rate, even under heavy load. Which Amazon EBS volume type fits BEST?",
    "options": {
      "A": "Throughput Optimized HDD (st1)",
      "B": "Cold HDD (sc1)",
      "C": "Provisioned IOPS SSD (io2 Block Express)",
      "D": "General Purpose SSD (gp2) with burst credits"
    },
    "correct_answer": "C",
    "explanation": "AWS describes Provisioned IOPS SSD as its highest-performance EBS volumes, for critical, IOPS-intensive workloads that need low latency. They deliver the IOPS you provision 99.9% of the time, and io2 Block Express gives sub-millisecond latency. Think of a reserved express lane: the speed you pay for is the speed you get. st1 and sc1 (A, B) are hard-disk volumes built for large sequential reads and cheap cold data, not random low-latency lookups. gp2 (D) relies on burst credits, so its performance can drop once the credits run out, which breaks the 'consistent' requirement."
  },
  {
    "number": 317, "domain": 3,
    "source": "https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-git-branch-approach/gitflow-branching-strategy.html",
    "question": "An ML team ships model releases on a fixed quarterly schedule. Several features are developed in parallel, merged with approval into an integration branch, and then grouped into a release that moves to staging and production together. Which Git branching strategy matches this process?",
    "options": {
      "A": "GitHub Flow",
      "B": "Gitflow",
      "C": "Trunk-based development",
      "D": "Forking workflow with no shared branches"
    },
    "correct_answer": "B",
    "explanation": "AWS Prescriptive Guidance says Gitflow suits teams with scheduled release cycles that define a set of features as a release. Feature branches merge, with approval, into a develop branch used for integration. When the planned features are in, a release branch is created for deployment to upper environments. Think of a magazine: articles collect in the draft folder, then an issue is put together and printed on a set date. GitHub Flow (A) has only main plus short feature branches that deploy as soon as they merge, which fits continuous delivery, not quarterly bundles. Trunk-based development (C) has everyone commit to main often, with no long-lived develop or release branches. D describes how contributors share code; it isn't a release-branching model."
  },
  {
    "number": 318, "domain": 3,
    "source": "https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-git-branch-approach/gitflow-branching-strategy.html",
    "question": "A small MLOps team deploys its inference service many times a day. Every change is made on a short-lived branch, reviewed in a pull request, merged into main, and deployed right away. Main must always be deployable. Which branching strategy is the team using?",
    "options": {
      "A": "Gitflow, because it has feature branches",
      "B": "GitHub Flow",
      "C": "Gitflow with hotfix branches only",
      "D": "Release-train branching with a long-lived develop branch"
    },
    "correct_answer": "B",
    "explanation": "GitHub Flow is the simple model: one main branch that's always deployable, short feature branches, a pull request, merge, deploy. It fits teams doing continuous delivery of a single version. Gitflow also uses feature branches (that's the trap in A), but it adds develop and release branches for scheduled releases, which this team doesn't have. C and D both rely on extra long-lived branches. (AWS's Gitflow page is the source here. The GitHub Flow description is the standard definition and contrasts with it.)"
  },
  {
    "number": 319, "domain": 2,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html",
    "question": "A binary classifier outputs probabilities. Product owners haven't decided on a decision threshold yet, and they want one number that compares candidate models across ALL possible thresholds. Which metric should the ML engineer report?",
    "options": {
      "A": "Accuracy at a threshold of 0.5",
      "B": "AUC (area under the ROC curve)",
      "C": "Precision at a threshold of 0.5",
      "D": "Mean absolute error (MAE)"
    },
    "correct_answer": "B",
    "explanation": "AWS defines the ROC curve as a plot of the true positive rate (recall) against the false positive rate as the threshold changes, and AUC as the area under that curve. It gives 'an aggregated measure of the model performance across all possible classification thresholds'. 1 is perfect and 0.5 is no better than a coin flip. Think of rating a smoke detector across every sensitivity setting at once instead of testing just one. A and C each lock in one threshold, which the owners haven't chosen. D is a regression metric for numeric predictions, not probabilities of a class."
  },
  {
    "number": 320, "domain": 2,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html",
    "question": "A fraud model's confusion matrix on 10,000 test transactions shows 80 true positives, 20 false negatives, 400 false positives and 9,500 true negatives. Which statement is correct?",
    "options": {
      "A": "Recall is about 0.17 and precision is 0.80.",
      "B": "Recall is 0.80 and precision is about 0.17.",
      "C": "Accuracy is about 0.96, so the model is ready for production.",
      "D": "Recall and precision are both about 0.96."
    },
    "correct_answer": "B",
    "explanation": "Recall = TP / (TP + FN) = 80 / 100 = 0.80, so the model catches 80% of the real fraud. Precision = TP / (TP + FP) = 80 / 480 ≈ 0.17, so only about 1 in 6 alerts is real fraud. Memory aid: Recall cares about what you Missed (FN); Precision cares about false alarms (FP). A swaps the two formulas, which is the most common exam trap. C: accuracy is (80 + 9,500) / 10,000 ≈ 0.96, but with only 1% fraud, accuracy hides the flood of false alarms. AWS points to balanced accuracy for exactly this kind of imbalance. D is just wrong arithmetic."
  },
  {
    "number": 321, "domain": 2,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/autopilot-metrics-validation.html",
    "question": "An ML engineer trains several different base models, generates out-of-fold predictions from each, and then trains another model on those predictions to learn how much weight each base model should get. Which ensembling technique is this?",
    "options": {
      "A": "Bagging",
      "B": "Boosting",
      "C": "Stacking",
      "D": "Early stopping"
    },
    "correct_answer": "C",
    "explanation": "AWS's Autopilot docs describe it this way: base models make out-of-fold predictions, 'used as features to train a stacking model. The stacking model learns the importance weights for each base model.' A manager listening to several advisers and learning whose advice to trust most is stacking. Bagging (A) trains copies of the same kind of model on random resamples and averages them, as a random forest does, with no learned combiner. Boosting (B) trains models one after another, each fixing the previous one's mistakes, as XGBoost does. Early stopping (D) ends training when validation stops improving; it isn't an ensemble."
  },
  {
    "number": 322, "domain": 3,
    "source": "https://docs.aws.amazon.com/step-functions/latest/dg/connect-sagemaker.html",
    "question": "A workflow must run a SageMaker AI processing job, wait until it finishes, then start a training job, wait for it to finish, and branch on the result. The team wants a visual, serverless orchestrator with built-in retries, and no polling code. Which approach should the team use?",
    "options": {
      "A": "AWS Step Functions with the SageMaker AI service integration using the Run a Job (.sync) pattern",
      "B": "A single Lambda function that calls CreateProcessingJob and CreateTrainingJob in sequence",
      "C": "Amazon EventBridge Scheduler targets that start both jobs at fixed times",
      "D": "Amazon SQS queues between the jobs"
    },
    "correct_answer": "A",
    "explanation": "Step Functions has an optimized SageMaker AI integration that supports the Run a Job (.sync) pattern for CreateProcessingJob, CreateTrainingJob, CreateTransformJob, CreateHyperParameterTuningJob and CreateLabelingJob. The step waits until the job finishes before moving on, and you can add Retry and Catch to any step. It's a recipe card that says 'wait until the bread rises before baking'. B: Lambda times out after 15 minutes, and training jobs often run for hours, so you'd be writing polling code. C starts jobs at set times whether or not the previous job finished. D passes messages, but it has no idea when a SageMaker job completes. (SageMaker Pipelines is the other correct-style answer you may see; it wasn't offered here.)"
  },
  {
    "number": 323, "domain": 3,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/docker-containers-adapt-your-own.html",
    "question": "A company's security team requires that all training and inference run in the company's own hardened Docker image, which includes a proprietary library that no prebuilt SageMaker AI image contains. How should the ML engineer make this image work with SageMaker AI?",
    "options": {
      "A": "Install the SageMaker Training Toolkit and SageMaker AI Inference Toolkit in the image, push it to Amazon ECR, and reference it in the training job and model.",
      "B": "Upload the Dockerfile to Amazon S3 and point the training job's input channel at it.",
      "C": "Use a SageMaker AI built-in algorithm and pass the proprietary library as a hyperparameter.",
      "D": "Push the image to Docker Hub and have SageMaker AI pull it at runtime over the internet."
    },
    "correct_answer": "A",
    "explanation": "AWS says that when you need an existing image that 'satisfies feature or safety requirements that are not currently supported by a pre-built SageMaker AI image', you adapt it with the SageMaker Training Toolkit and the SageMaker AI Inference Toolkit. This is bring your own container (BYOC). The image then goes to Amazon ECR, the registry SageMaker pulls from. It's like adding the standard plug adapter to your own appliance so it fits the outlet. B: SageMaker runs built images, not Dockerfiles in S3. C: hyperparameters are settings, not code. D: a public registry pulled over the internet breaks the hardened, controlled-image requirement. The normal pattern is ECR."
  },
  {
    "number": 324, "domain": 3,
    "source": "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html",
    "question": "A Lambda function loads a 300 MB scikit-learn model and serves predictions for a mobile app. Users complain that the first requests after quiet periods take several seconds. The team needs consistently low latency for interactive traffic. What should the team configure?",
    "options": {
      "A": "Reserved concurrency on the function",
      "B": "Provisioned concurrency on the $LATEST version",
      "C": "A longer function timeout",
      "D": "Provisioned concurrency on a published version or alias of the function"
    },
    "correct_answer": "D",
    "explanation": "Provisioned concurrency keeps a number of execution environments already initialized, with the model loaded, so requests don't pay the cold-start cost. AWS says it fits interactive, latency-sensitive workloads such as web and mobile apps. It's like keeping a few taxis idling at the curb instead of calling one from the garage. It must be set on a version or alias. AWS says you can't use it with $LATEST, which is why B is wrong. Reserved concurrency (A) only reserves and caps capacity; it doesn't pre-warm anything, so cold starts remain. C lets slow requests finish but doesn't make them faster."
  },
  {
    "number": 325, "domain": 4,
    "source": "https://docs.aws.amazon.com/chatbot/latest/adminguide/what-is.html",
    "question": "The on-call ML team lives in Slack. It wants CloudWatch alarms for endpoint latency and Model Monitor violations posted to a Slack channel, with buttons that can run a Lambda remediation function. Which AWS service is designed for this?",
    "options": {
      "A": "Amazon SES",
      "B": "AWS Chatbot (now Amazon Q Developer in chat applications), subscribed to the SNS topic that the alarms publish to",
      "C": "Amazon Lex",
      "D": "Amazon Pinpoint"
    },
    "correct_answer": "B",
    "explanation": "AWS Chatbot, renamed Amazon Q Developer in chat applications, takes notifications from SNS topics and posts them to Slack, Microsoft Teams or Chime channels. It can add custom action buttons that run a Lambda function or CLI command. This is called ChatOps: the alarm walks into the team's group chat instead of their email. The C01 guide uses the old name, AWS Chatbot, so expect that name on C01. A sends email. C builds conversational bots for your customers; it doesn't route AWS alarms. D is a customer-engagement and marketing messaging service."
  },
  {
    "number": 326, "domain": 3,
    "source": "https://docs.aws.amazon.com/serverlessrepo/latest/devguide/what-is-serverlessrepo.html",
    "question": "A platform team built a serverless application (Lambda plus API Gateway) that wraps any SageMaker AI endpoint with request validation and logging. Other teams across the organization should be able to find it and deploy it into their own accounts with a few clicks. Which service is designed for publishing and sharing this kind of application?",
    "options": {
      "A": "Amazon ECR",
      "B": "AWS CodeArtifact",
      "C": "AWS Serverless Application Repository",
      "D": "AWS Marketplace"
    },
    "correct_answer": "C",
    "explanation": "The Serverless Application Repository lets you find, deploy and publish serverless applications. You can share them publicly or privately within your team or organization. You upload the code with an AWS SAM template, and users deploy with a few clicks from the Lambda console. It's an internal app store for Lambda-based apps. B stores software packages such as pip or npm libraries, not deployable applications. A stores container images. D is for selling third-party software to external customers."
  },
  {
    "number": 327, "domain": 4,
    "source": "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html",
    "question": "A central MLOps team wants data scientists to launch only approved, preconfigured ML environments (for example, a SageMaker AI domain with the required VPC, KMS key and instance limits) through self-service. The data scientists shouldn't need broad IAM permissions to the underlying services. Which service fits BEST?",
    "options": {
      "A": "AWS Systems Manager Parameter Store",
      "B": "AWS Config conformance packs",
      "C": "AWS Trusted Advisor",
      "D": "AWS Service Catalog portfolios of approved products"
    },
    "correct_answer": "D",
    "explanation": "Service Catalog lets administrators publish approved products, built from CloudFormation templates, into portfolios with constraints. End users then launch them self-service without direct access to the underlying services. It's a company cafeteria menu: you can only order what's on it, and the kitchen controls the recipe. (SageMaker AI project templates are delivered through Service Catalog too.) B checks resources against rules after they exist; it doesn't hand out approved launch buttons. C gives best-practice recommendations. A stores configuration values."
  },
  {
    "number": 328, "domain": 1,
    "source": "https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html",
    "question": "A research lab has 80 TB of microscope images on an on-premises NFS file server. The ML team needs the images copied into Amazon S3 for training, then incremental copies of new files every night. The team wants encryption in transit and integrity checks, and doesn't want to write scripts. Which service should the team use?",
    "options": {
      "A": "AWS Direct Connect alone",
      "B": "S3 Transfer Acceleration with the AWS CLI s3 sync command",
      "C": "AWS DataSync with an NFS source location and an S3 destination, run on a schedule",
      "D": "Amazon Kinesis Data Streams"
    },
    "correct_answer": "C",
    "explanation": "DataSync is AWS's managed file transfer service. It reads from NFS, SMB, HDFS or object storage and writes to S3, EFS or FSx, with built-in encryption and data integrity validation. AWS lists moving data in for ML processing as a use case. It's a moving company that also checks every box arrived unbroken. B still needs scripting, and Transfer Acceleration helps long-distance internet paths, not an on-premises NFS share. A is a private network link. It can make a transfer faster, but it doesn't move files by itself. D streams records; it doesn't copy file shares."
  },
  {
    "number": 329, "domain": 1,
    "source": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
    "question": "A bank's on-premises data center sends large daily training datasets to AWS. Compliance requires that this traffic avoid the public internet, and the team wants consistent network performance. Which service provides a dedicated private network connection from the data center to AWS?",
    "options": {
      "A": "An internet gateway attached to the VPC",
      "B": "S3 Transfer Acceleration",
      "C": "Amazon CloudFront",
      "D": "AWS Direct Connect"
    },
    "correct_answer": "D",
    "explanation": "Direct Connect links your network to AWS over a dedicated fiber connection at a Direct Connect location, bypassing internet service providers. Private virtual interfaces reach your VPC, and public virtual interfaces reach services such as S3. It's like having a private road built from your warehouse to the AWS loading dock. B and C both use AWS's edge network, but traffic still starts on the public internet. A is a VPC's door to the public internet, the opposite of what compliance wants."
  },
  {
    "number": 330, "domain": 4,
    "source": "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html",
    "question": "A SageMaker AI processing job reads training data from an Amazon RDS database by using a password. Security requires that the password never appear in code or environment variables and that it rotate automatically every 30 days. What should the ML engineer do?",
    "options": {
      "A": "Store the password in AWS Secrets Manager with automatic rotation turned on, and have the job's IAM role read the secret at runtime.",
      "B": "Store the password as a SageMaker AI hyperparameter.",
      "C": "Encrypt the password with AWS KMS and store the ciphertext in the job's environment variables, then rotate it manually.",
      "D": "Put the password in a Systems Manager Parameter Store String parameter."
    },
    "correct_answer": "A",
    "explanation": "Secrets Manager stores credentials and rotates them automatically. It updates the secret and the database password together, using managed rotation or a Lambda rotation function. The job fetches the current value at runtime by using its IAM role, so nothing is hard-coded. Picture a hotel key card that's reissued every month, with the front desk handing you the new one when you ask. B: hyperparameters show up in plain text in the job description. C is still manual and still puts the secret in an environment variable. D: a plain String parameter isn't even encrypted (SecureString would be), and Parameter Store has no built-in rotation."
  },
  {
    "number": 331, "domain": 1,
    "source": "https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html",
    "question": "Data scientists query a customer table in the AWS Glue Data Catalog with Athena to build training sets. They must see every row from their own country only, and the email and phone columns must stay hidden from them. Which approach meets this with the LEAST custom code?",
    "options": {
      "A": "A separate copy of the table for each country, with the PII columns dropped, made by a nightly Glue job",
      "B": "S3 bucket policies on the table's prefix",
      "C": "AWS Lake Formation data filters that grant column-level and row-level permissions on the table",
      "D": "IAM policies on the glue:GetTable action"
    },
    "correct_answer": "C",
    "explanation": "Lake Formation adds its own permission layer on top of IAM, with column-, row- and cell-level controls through data filters. Athena, Redshift Spectrum, EMR and Glue enforce these controls. It's a librarian who hands each reader the same book with some pages and lines blacked out. B works on whole objects in S3 and can't hide a column or row inside a file. A works, but it means building and maintaining many copies, which is lots of custom code and storage. D controls whether someone can see the table's definition, not which rows or columns they can read."
  },
  {
    "number": 332, "domain": 1,
    "source": "https://docs.aws.amazon.com/textract/latest/dg/what-is.html",
    "question": "An insurer needs to turn thousands of scanned claim forms, some handwritten, into structured key-value pairs and tables for a training dataset. Which AWS service does this without building a custom model?",
    "options": {
      "A": "Amazon Transcribe",
      "B": "Amazon Rekognition DetectText",
      "C": "Amazon Comprehend",
      "D": "Amazon Textract (AnalyzeDocument with forms and tables)"
    },
    "correct_answer": "D",
    "explanation": "Textract detects typed and handwritten text and, with its Document Analysis API, extracts forms (key-value pairs) and tables, keeping the structure that plain OCR loses. It's the difference between photocopying a form and having a clerk type each field into a spreadsheet. B finds words in photos and video frames (street signs, for example), but it doesn't understand form fields or tables. C analyzes text you already have; it can't read images. A converts speech to text."
  },
  {
    "number": 333, "domain": 1,
    "source": "https://docs.aws.amazon.com/comprehend-medical/latest/dev/comprehendmedical-welcome.html",
    "question": "A health-tech company wants to extract medications and medical conditions from doctors' free-text notes and map them to standard codes (RxNorm and ICD-10-CM) as features for a readmission model. Which service should the company use?",
    "options": {
      "A": "Amazon Comprehend custom entity recognition",
      "B": "Amazon Comprehend Medical with its ontology linking operations (InferRxNorm, InferICD10CM)",
      "C": "Amazon Textract AnalyzeDocument",
      "D": "AWS HealthLake alone, by importing the notes as plain text files"
    },
    "correct_answer": "B",
    "explanation": "Comprehend Medical detects medical entities such as conditions, medications and PHI in clinical text. Its ontology linking operations map them to standard codes: InferRxNorm for drugs, InferICD10CM for conditions, InferSNOMEDCT for concepts. It's a medical coder who reads the doctor's handwriting and fills in the official codes. A could be trained to spot entities, but you'd need labeled data, and it doesn't link to medical ontologies. C reads documents, but it doesn't understand medicine. D stores FHIR data and does use medical NLP under the hood, but the direct API for extracting and coding entities from notes is Comprehend Medical."
  },
  {
    "number": 334, "domain": 1,
    "source": "https://docs.aws.amazon.com/transcribe/latest/dg/custom-vocabulary.html",
    "question": "A company transcribes support calls with Amazon Transcribe to train a call-intent model. The transcripts keep misspelling the company's product names and internal acronyms. What is the simplest fix?",
    "options": {
      "A": "Fine-tune a foundation model in Amazon Bedrock to fix spelling after transcription.",
      "B": "Run Amazon Translate on the transcripts with custom terminology.",
      "C": "Create an Amazon Transcribe custom vocabulary (table format) with the product names and acronyms, and use it in the transcription jobs.",
      "D": "Switch to Amazon Polly."
    },
    "correct_answer": "C",
    "explanation": "AWS says custom vocabularies improve transcription accuracy for domain-specific terms such as brand names, acronyms and proper nouns that Transcribe gets wrong. The table format is recommended because list format is being deprecated. It's like giving a court stenographer a cheat sheet of tricky names before the trial. B is for translating between languages, not fixing English transcripts. A could work but is far from simple. D does the opposite of Transcribe: it turns text into speech."
  },
  {
    "number": 335, "domain": 3,
    "source": "https://docs.aws.amazon.com/translate/latest/dg/how-custom-terminology.html",
    "question": "A retailer uses Amazon Translate to localize product descriptions for training a multilingual search model. Brand names such as 'CloudComfort' are being translated literally into other languages. How can the team keep brand names consistent?",
    "options": {
      "A": "Upload a custom terminology file that maps each brand name to the desired target-language term, and pass it with the translation requests.",
      "B": "Create an Amazon Transcribe custom vocabulary.",
      "C": "Lower the temperature setting of Amazon Translate.",
      "D": "Use Amazon Comprehend to detect the brand names and delete them before translation."
    },
    "correct_answer": "A",
    "explanation": "Custom terminology makes sure brand names, character names, model names and other unique content come out the way you want. AWS's own example keeps 'Amazon Photos' unchanged in French. AWS also notes that Translate uses the terminology based on context, so it isn't an absolute guarantee. It's a do-not-translate list for the translator. B is for speech-to-text. C: Translate has no temperature setting; that's a generative-model parameter. D loses the brand names entirely."
  },
  {
    "number": 336, "domain": 3,
    "source": "https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html",
    "question": "A bank wants a voice and text bot that understands what a customer wants (for example, 'check balance' or 'report a lost card'), asks for the missing details, and then calls a Lambda function to fulfil the request. Which AWS service is purpose-built for this?",
    "options": {
      "A": "Amazon Comprehend",
      "B": "Amazon Polly",
      "C": "Amazon Kendra",
      "D": "Amazon Lex"
    },
    "correct_answer": "D",
    "explanation": "Lex builds conversational interfaces for voice and text. It combines speech recognition and natural language understanding to identify the user's intent, collect the required details (called slots), and fulfil the request by calling Lambda. It's an automated receptionist that asks 'Which account?' until it has everything it needs. Polly (B) only speaks text aloud. Kendra (C) searches documents for answers; it doesn't run multi-turn task conversations. Comprehend (A) analyzes text, for example sentiment and entities, but it doesn't hold a conversation."
  },
  {
    "number": 337, "domain": 2,
    "source": "https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html",
    "question": "Employees need to ask natural-language questions such as 'How many vacation days do new hires get?' and get answers from documents spread across SharePoint and S3, filtered by each user's document permissions. Which service on the C01 in-scope list is an intelligent enterprise search service built for this?",
    "options": {
      "A": "Amazon Athena",
      "B": "Amazon OpenSearch Service with keyword (BM25) search only",
      "C": "Amazon Kendra",
      "D": "Amazon Textract"
    },
    "correct_answer": "C",
    "explanation": "Kendra is a managed intelligent search service. It ranks results by meaning rather than keywords, answers factoid and descriptive questions, connects to sources such as SharePoint and S3, and can filter results by each user's access. It's a reference librarian instead of a card catalog. B with keyword search only matches words, not meaning, and you'd build the connectors and permissions yourself. A runs SQL on structured data. D extracts text from documents but can't search them. (Side note: AWS has closed Kendra to new customers and points to Bedrock Knowledge Bases, but the C01 guide lists Kendra in scope.)"
  },
  {
    "number": 338, "domain": 1,
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management-public.html",
    "question": "A team is creating a SageMaker Ground Truth labeling job for 200,000 product images. The images contain no personal data. The team wants the largest available pool of workers and the fastest turnaround. A second labeling job covers patient X-rays that contain protected health information. Which workforce choices are correct?",
    "options": {
      "A": "Amazon Mechanical Turk for both jobs, with the FreeOfPersonallyIdentifiableInformation flag set on both",
      "B": "Amazon Mechanical Turk for the product images, and a private (or vendor) workforce for the X-rays",
      "C": "A private workforce for the product images, and Amazon Mechanical Turk for the X-rays",
      "D": "Amazon Mechanical Turk for both jobs, because Ground Truth encrypts the data"
    },
    "correct_answer": "B",
    "explanation": "AWS says the Mechanical Turk workforce gives the most workers and usually the fastest turnaround, but you must not share confidential information, personal information or PHI with it. Ground Truth even requires you to declare that the data is free of PII, and the job fails otherwise. Sensitive data must go to a private workforce (your own employees) or a vendor workforce. It's like hiring a big public crowd to sort holiday photos, but only your own staff ever see medical records. A is dishonest: setting the flag on PHI data breaks the rules. C is backwards. D: encryption doesn't change who sees the data during labeling. (Side note: AWS says Mechanical Turk closed permanently on 2026-09-30, but the C01 guide still lists it, so know the rule.)"
  },
  {
    "number": 339, "domain": 2,
    "source": "https://docs.aws.amazon.com/frauddetector/latest/ug/what-is-frauddetector.html",
    "question": "On the MLA-C01 exam, a scenario describes an e-commerce company with no ML expertise that wants a fully managed service to build a custom model that flags fake account sign-ups and suspicious online payments, plus rules that assign outcomes such as 'approve' or 'send for review'. Which AWS service matches this description?",
    "options": {
      "A": "Amazon Fraud Detector",
      "B": "Amazon GuardDuty",
      "C": "Amazon Macie",
      "D": "SageMaker AI Random Cut Forest"
    },
    "correct_answer": "A",
    "explanation": "Fraud Detector is a fully managed service that builds custom fraud models from your data, for unauthorized transactions and fake accounts. You add decision rules that assign outcomes such as pass or send for review, and you don't need ML expertise. GuardDuty (B) detects threats to your AWS account, such as compromised credentials or crypto-mining, not fraud by your customers. Macie (C) finds sensitive data in S3. RCF (D) is an anomaly-detection algorithm you'd have to build around yourself, which isn't 'no ML expertise'. (Side note: AWS closed Fraud Detector to new customers on 2025-11-07 and suggests SageMaker AI, AutoGluon or AWS WAF instead, but the C01 guide lists it in scope.)"
  },
  {
    "number": 340, "domain": 4,
    "source": "https://docs.aws.amazon.com/lookout-for-equipment/latest/ug/what-is.html",
    "question": "On the MLA-C01 exam, a factory wants to use historical readings from up to 300 sensors on pumps and compressors to detect abnormal equipment behavior and predict failures, without ML expertise. Which AWS service matches this description?",
    "options": {
      "A": "Amazon Lookout for Equipment",
      "B": "Amazon Kinesis Video Streams",
      "C": "Amazon DevOps Guru",
      "D": "AWS IoT Greengrass"
    },
    "correct_answer": "A",
    "explanation": "Lookout for Equipment learns the normal behavior of industrial equipment from historical sensor data (up to 300 sensors in one model), detects abnormal behavior and supports predictive maintenance, with no ML expertise needed. B streams video, not sensor time series. C watches software operations metrics, not factory machines. D runs code on edge devices but doesn't build the anomaly model for you. (Side note: AWS discontinued Lookout for Equipment on 2026-10-07. The C01 guide lists 'Amazon Lookout' in scope, so know what each Lookout service did: Equipment = sensors, Vision = defects in images, Metrics = anomalies in business metrics.)"
  }
].map(q => ({ topic: "Topic 5 - C01 Gap Coverage", origin: "written-c01", c01: true, ...q })));

// Questions written earlier for C02 that also test skills or services named in the MLA-C01 exam guide.
// C01 mode includes them alongside the original bank.
const C01_ALSO = [162, 176, 177, 180, 184, 193, 197, 199, 203, 204, 209, 210, 212, 214, 215, 216, 217, 218, 219, 221,
  226, 229, 230, 231, 232, 236, 239, 241, 243, 244, 245, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 265, 266,
  267, 268, 269, 270, 271, 272, 275, 276, 277, 278, 279, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 292, 293,
  294, 295, 296, 299, 302, 303, 305, 306, 307, 308];
EXAM_DATA.forEach(q => { if (C01_ALSO.includes(q.number)) q.c01 = true; });
