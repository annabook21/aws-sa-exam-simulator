// MLA-C02 additions, part 3: questions for in-scope services and features from the official MLA-C02 in-scope list
// that earlier parts did not cover. Each question was written after reading the AWS documentation page in its
// "source" field, and the facts it tests come from that page.
EXAM_DATA.push(...[
  {
    "number": 250, "skill": "2.1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "A retailer wants to forecast next month's daily sales for each of 5,000 products by using several years of sales history. The team wants a SageMaker AI built-in algorithm designed for time-series forecasting. Which algorithm should it use?",
    "options": {
      "A": "Linear Learner",
      "B": "Random Cut Forest (RCF)",
      "C": "DeepAR",
      "D": "Sequence-to-Sequence (seq2seq)"
    },
    "correct_answer": "C",
    "explanation": "AWS lists DeepAR as the built-in algorithm for time-series forecasting: it predicts future values from historical data using recurrent neural networks. Linear Learner does regression and classification on tabular data, not forecasting across many related series. RCF finds anomalies. Seq2seq turns one sequence of tokens into another, as in translation or summarization."
  },
  {
    "number": 251, "skill": "2.1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "A support team wants to find duplicate support tickets and route new tickets to the right queue based on how similar their content is to previous tickets. The team wants a SageMaker AI built-in algorithm that learns low-dimensional embeddings for these comparisons. Which algorithm fits?",
    "options": {
      "A": "Object2Vec",
      "B": "K-Means",
      "C": "Latent Dirichlet Allocation (LDA)",
      "D": "Principal Component Analysis (PCA)"
    },
    "correct_answer": "A",
    "explanation": "AWS's algorithm guide gives this exact example for Object2Vec: identifying duplicate support tickets or routing tickets by text similarity. It learns dense embeddings of high-dimensional objects. K-Means groups data but doesn't learn embeddings for comparing pairs. LDA finds topics. PCA reduces numeric features, not text similarity."
  },
  {
    "number": 252, "skill": "2.1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "A bank wants to flag logins where a user ID signs in from an IP address that is unusual for that user, which can indicate a bad actor. Which SageMaker AI built-in algorithm is designed for this?",
    "options": {
      "A": "Random Cut Forest (RCF)",
      "B": "IP Insights",
      "C": "XGBoost",
      "D": "K-Nearest Neighbors (k-NN)"
    },
    "correct_answer": "B",
    "explanation": "IP Insights learns usage patterns between IPv4 addresses and entities such as user IDs or account numbers, and it flags suspicious combinations. That's AWS's own example. RCF finds general numeric anomalies but doesn't model IP-to-user relationships. XGBoost and k-NN are supervised and need labeled fraud examples."
  },
  {
    "number": 253, "skill": "2.1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "A legal firm has 400,000 documents and wants to discover what topics they cover. No topics are defined in advance, and the documents are not labeled. Which SageMaker AI built-in algorithms are designed for this? (Choose two.)",
    "options": {
      "A": "Latent Dirichlet Allocation (LDA)",
      "B": "BlazingText in supervised text classification mode",
      "C": "Neural Topic Model (NTM)",
      "D": "Sequence-to-Sequence (seq2seq)",
      "E": "Linear Learner"
    },
    "correct_answer": "AC",
    "explanation": "Topics unknown in advance plus no labels means topic modeling, which is unsupervised. AWS lists LDA and NTM for this. BlazingText's classification mode needs labeled categories. Seq2seq translates or summarizes. Linear Learner is supervised and needs labels."
  },
  {
    "number": 254, "skill": "2.1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "A media company needs to classify 50 million short product reviews into predefined categories and wants a SageMaker AI built-in algorithm optimized to scale text classification and Word2vec to very large datasets. Which algorithm should it use?",
    "options": {
      "A": "Neural Topic Model (NTM)",
      "B": "Object2Vec",
      "C": "Factorization Machines",
      "D": "BlazingText"
    },
    "correct_answer": "D",
    "explanation": "AWS describes BlazingText as a highly optimized implementation of Word2vec and text classification that scales easily to large datasets. NTM discovers unknown topics instead of using predefined categories. Object2Vec learns pairwise embeddings. Factorization Machines target sparse tabular data such as recommendations."
  },
  {
    "number": 255, "skill": "2.1.8",
    "source": "https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html",
    "question": "An online store wants 'Frequently bought together' and 'Recommended for you' widgets, based on users' click and purchase history. The team has no ML expertise and wants a fully managed service with real-time recommendations. Which solution meets these requirements with the LEAST effort?",
    "options": {
      "A": "Train a Factorization Machines model on SageMaker AI and host it on a real-time endpoint.",
      "B": "Use Amazon Personalize with the item interaction data and a use-case-optimized recommender.",
      "C": "Use Amazon Bedrock with the purchase history in each prompt.",
      "D": "Use SageMaker Autopilot to build a recommendation model."
    },
    "correct_answer": "B",
    "explanation": "Amazon Personalize is AWS's fully managed recommendation service. It learns mainly from item interaction data (clicks, purchases) and offers ready-made recommenders such as 'Frequently bought together' and 'Recommended for you.' Factorization Machines works but means building and hosting a model yourself. A foundation model with history in every prompt is costly and isn't a trained recommender. Autopilot builds tabular models, not recommenders."
  },
  {
    "number": 256, "skill": "2.1.8",
    "source": "https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html",
    "question": "A marketing team wants to send each of its 3 million email subscribers a weekly list of personalized product recommendations, and also wants to find which users are most likely to engage with a new product line. The company already uses Amazon Personalize for its website. What should the team use?",
    "options": {
      "A": "Amazon Personalize batch recommendations for the email list, and batch user segments for the new product line",
      "B": "A Personalize real-time campaign called 3 million times every week",
      "C": "SageMaker AI batch transform with a new custom recommendation model",
      "D": "Amazon Comprehend to analyze subscribers' past emails"
    },
    "correct_answer": "A",
    "explanation": "AWS lists both of these as Personalize use cases: batch recommendations for every user on an email list, and user segments of the people most likely to interact with certain items. Calling a real-time campaign millions of times is wasteful. A new SageMaker model duplicates what Personalize already does. Comprehend analyzes text, not purchase behavior."
  },
  {
    "number": 257, "skill": "4.1.2",
    "source": "https://docs.aws.amazon.com/devops-guru/latest/userguide/welcome.html",
    "question": "An ML platform team wants a managed service that uses machine learning to analyze the operational metrics and events of its application's AWS resources, detect behavior that deviates from normal, and recommend fixes, without writing alarm thresholds by hand. Which service fits? (Note: AWS stops accepting new customers for this service on October 29, 2026.)",
    "options": {
      "A": "Amazon CloudWatch alarms with static thresholds",
      "B": "AWS Trusted Advisor",
      "C": "SageMaker Model Monitor",
      "D": "Amazon DevOps Guru"
    },
    "correct_answer": "D",
    "explanation": "DevOps Guru applies machine learning to operational data, metrics and events to find behavior that deviates from normal patterns, and it gives recommendations with reactive and proactive insights. Static CloudWatch thresholds are the manual approach the question rules out. Trusted Advisor checks best practices, not live anomalies. Model Monitor watches model data and predictions, not application operations. AWS has announced that DevOps Guru won't accept new customers after October 29, 2026, but it remains on the exam's in-scope list."
  },
  {
    "number": 258, "skill": "1.1.8",
    "source": "https://docs.aws.amazon.com/healthlake/latest/devguide/what-is.html",
    "question": "A hospital network must store patient records in the FHIR R4 format, automatically extract medical entities from unstructured clinical notes, and let analysts query the results with SQL for ML feature preparation. Which service meets these requirements with the LEAST custom work?",
    "options": {
      "A": "Store the notes in Amazon S3 and run Amazon Comprehend Medical in a custom pipeline, then load the results into Amazon Redshift.",
      "B": "Use Amazon DynamoDB with a FHIR-shaped schema and a Lambda function that calls Amazon Comprehend.",
      "C": "Use AWS HealthLake, which stores FHIR R4 data, applies integrated medical NLP, and can be queried with Amazon Athena.",
      "D": "Use Amazon Kendra to index the clinical notes."
    },
    "correct_answer": "C",
    "explanation": "AWS HealthLake is a HIPAA-eligible FHIR R4 data store. Its integrated medical NLP extracts entities and relationships from unstructured notes and stores them as FHIR resources that Athena can query with SQL. Comprehend Medical plus Redshift works, but you build the whole pipeline yourself. DynamoDB isn't a FHIR server. Kendra searches documents but doesn't structure medical data."
  },
  {
    "number": 259, "skill": "1.1.8",
    "source": "https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html",
    "question": "A manufacturer wants to stream live video from 200 factory cameras into AWS, store it for 7 days, and run an application that processes frames in real time to detect safety violations. Which service should ingest the video?",
    "options": {
      "A": "Amazon Kinesis Video Streams",
      "B": "Amazon Kinesis Data Streams",
      "C": "Amazon Data Firehose",
      "D": "Amazon S3 multipart uploads from each camera"
    },
    "correct_answer": "A",
    "explanation": "Kinesis Video Streams ingests live video from devices such as security cameras, stores it for a retention period you set, and lets applications read it frame by frame in real time. Kinesis Data Streams is built for data records, not media streams. Firehose delivers data in batches to destinations and has no frame access. S3 uploads aren't a live stream."
  },
  {
    "number": 260, "skill": "2.2.4",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-hyperpod.html",
    "question": "A company is pre-training a large foundation model on a cluster of thousands of GPUs for several weeks. GPU failures are expected, and the team wants faulty hardware detected and replaced automatically so that training can resume, with Slurm or Amazon EKS for orchestration. Which solution fits?",
    "options": {
      "A": "A standard SageMaker AI training job with managed Spot Training",
      "B": "Amazon SageMaker HyperPod",
      "C": "AWS Batch with GPU compute environments",
      "D": "Amazon EC2 instances in an Auto Scaling group with a custom health check script"
    },
    "correct_answer": "B",
    "explanation": "SageMaker HyperPod provides resilient clusters for training foundation models on thousands of accelerators. It automatically detects and replaces faulty hardware and supports Slurm or Amazon EKS orchestration. A Spot training job saves money but isn't built for multi-week cluster resilience. AWS Batch and EC2 with custom scripts mean building the resiliency yourself."
  },
  {
    "number": 261, "skill": "2.1.7",
    "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html",
    "question": "A chatbot gets a mix of simple and complex questions. Sending everything to the larger model in a model family is expensive, and sending everything to the smaller one hurts quality on hard questions. The company wants Amazon Bedrock to pick the model for each request automatically, through one endpoint. Which feature should it use?",
    "options": {
      "A": "Cross-Region inference profiles",
      "B": "Bedrock Flows with a condition node written by the team",
      "C": "Model distillation",
      "D": "Amazon Bedrock intelligent prompt routing"
    },
    "correct_answer": "D",
    "explanation": "Intelligent prompt routing gives you one serverless endpoint that predicts the response quality of each model in a family for each request and routes to the best choice for quality and cost. Cross-Region inference spreads load across Regions but doesn't pick models. A Flows condition node means writing your own routing rules. Distillation trains a new smaller model rather than routing between existing ones."
  },
  {
    "number": 262, "skill": "3.1.6",
    "source": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-a2a.html",
    "question": "Several teams built AI agents with different frameworks. A travel-planning agent must discover a booking agent's capabilities and delegate tasks to it, agent to agent, using an open protocol with agent discovery. Which approach fits?",
    "options": {
      "A": "Expose each agent as a Model Context Protocol (MCP) tool server.",
      "B": "Deploy the agents as Agent-to-Agent (A2A) servers on AgentCore Runtime, with discovery through Agent Cards.",
      "C": "Put each agent behind Amazon API Gateway and share the URLs in a wiki.",
      "D": "Use Amazon SQS queues between the agents."
    },
    "correct_answer": "B",
    "explanation": "A2A is the open protocol for agents to talk to other agents. AgentCore Runtime supports A2A servers, and discovery works through Agent Cards at /.well-known/agent-card.json. MCP is for connecting agents to tools, not agent-to-agent delegation. API Gateway URLs and SQS queues give you no standard discovery or protocol."
  },
  {
    "number": 263, "skill": "4.3.8",
    "source": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html",
    "question": "A scheduling agent on Amazon Bedrock AgentCore must read and update each user's calendar in a third-party SaaS app on the user's behalf, using OAuth tokens. Security requires that the tokens be managed securely and that access be audited. Which AgentCore capability fits?",
    "options": {
      "A": "AgentCore Identity",
      "B": "AgentCore Memory",
      "C": "AgentCore Observability",
      "D": "AgentCore Code Interpreter"
    },
    "correct_answer": "A",
    "explanation": "AgentCore Identity manages identity and credentials for agents. It lets agents access AWS resources and third-party services on behalf of users, with security controls and audit trails, including outbound credential providers for OAuth. Memory stores conversation context. Observability traces agent steps. Code Interpreter runs code in a sandbox."
  },
  {
    "number": 264, "skill": "4.3.9",
    "source": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html",
    "question": "A customer-service agent calls tools through Amazon Bedrock AgentCore Gateway. The business requires a deterministic rule: the agent may call the refund tool only for amounts under $100, and it must not call the account-closure tool at all, whatever the model decides. Which solution meets this requirement?",
    "options": {
      "A": "Add the rules to the agent's system prompt.",
      "B": "Configure a Bedrock guardrail denied topic for refunds over $100.",
      "C": "Use AgentCore Policy rules on the Gateway to control which tools the agent can call and under what conditions.",
      "D": "Lower the model's temperature so that it follows instructions more reliably."
    },
    "correct_answer": "C",
    "explanation": "AgentCore Policy provides deterministic control. It intercepts every tool call through Gateway and enforces which tools an agent can use, what actions it can take, and under what conditions. Prompt instructions and temperature are suggestions the model can ignore. A guardrail filters conversation content but doesn't enforce limits on tool calls."
  },
  {
    "number": 265, "skill": "4.3.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/security_iam_id-based-policy-examples.html",
    "question": "A security team requires that every SageMaker AI training job in the account runs inside approved VPC subnets. Data scientists create jobs from notebooks and scripts. How should the team enforce this so that jobs without the approved subnets are rejected?",
    "options": {
      "A": "Ask data scientists to set the VPC configuration in every job, and review CloudTrail weekly.",
      "B": "Use an IAM policy with the sagemaker:VpcSubnets (and sagemaker:VpcSecurityGroupIds) condition keys on CreateTrainingJob.",
      "C": "Enable network isolation on the SageMaker AI domain.",
      "D": "Create an AWS Config rule that deletes training jobs that run outside a VPC."
    },
    "correct_answer": "B",
    "explanation": "SageMaker AI supports IAM condition keys such as sagemaker:VpcSubnets and sagemaker:VpcSecurityGroupIds. A policy on CreateTrainingJob can deny any request that doesn't use the approved subnets, so the job is never created. Asking people and reviewing logs isn't enforcement. Network isolation blocks the container's network, which is a different control. A Config rule reacts after the job already exists."
  },
  {
    "number": 266, "skill": "4.3.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/security_iam_id-based-policy-examples.html",
    "question": "Compliance requires that no one can create a SageMaker AI training job unless network isolation is enabled and the training volume is encrypted with the company's KMS key. Which approach enforces both requirements at creation time?",
    "options": {
      "A": "IAM policy conditions using sagemaker:NetworkIsolation and sagemaker:VolumeKmsKey on CreateTrainingJob",
      "B": "An Amazon EventBridge rule that stops non-compliant training jobs after they start",
      "C": "A default KMS key on the S3 bucket that stores training data",
      "D": "SageMaker Model Monitor on all endpoints"
    },
    "correct_answer": "A",
    "explanation": "AWS documents the sagemaker:NetworkIsolation and sagemaker:VolumeKmsKey condition keys for exactly this: a policy that refuses CreateTrainingJob unless both settings are present. An EventBridge rule acts after the job has already started. Bucket encryption doesn't control the training volume or network isolation. Model Monitor watches endpoints, not training jobs."
  },
  {
    "number": 267, "skill": "3.2.3",
    "source": "https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html",
    "question": "SageMaker AI training jobs run in private subnets with no internet access, but they need to pip install approved Python packages. The security team wants one internal repository that can also fetch approved packages from PyPI on demand, without managing servers. Which solution meets these requirements?",
    "options": {
      "A": "Run a self-hosted PyPI mirror on an EC2 instance.",
      "B": "Add a NAT gateway so the jobs can reach PyPI directly.",
      "C": "Store wheel files in an S3 bucket and install them from S3 paths in each script.",
      "D": "Use an AWS CodeArtifact repository with an external connection to PyPI, reached through a VPC endpoint."
    },
    "correct_answer": "D",
    "explanation": "CodeArtifact is a managed package repository that works with pip. An external connection to a public repository such as PyPI fetches packages on demand and stores them. A self-hosted mirror means managing servers. A NAT gateway breaks the no-internet rule. Wheels in S3 work, but every package and its dependencies must be managed by hand."
  },
  {
    "number": 268, "skill": "4.2.2",
    "source": "https://docs.aws.amazon.com/codeguru/latest/profiler-ug/what-is-codeguru-profiler.html",
    "question": "A Python feature-engineering service that feeds a real-time model has high CPU use and rising latency. The team wants to find the most expensive lines of code in the running application and get recommendations, without adding manual timing code. Which service fits?",
    "options": {
      "A": "AWS X-Ray",
      "B": "Amazon CodeGuru Profiler",
      "C": "Amazon Inspector",
      "D": "SageMaker Debugger"
    },
    "correct_answer": "B",
    "explanation": "CodeGuru Profiler collects runtime performance data from live applications (Java and Python), finds the most expensive lines of code and CPU bottlenecks, and recommends fixes. X-Ray shows which service in a request path is slow, not which line of code. Inspector finds software vulnerabilities. Debugger profiles training jobs, not live application services."
  },
  {
    "number": 269, "skill": "4.2.4",
    "source": "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html",
    "question": "A company has run dozens of SageMaker AI endpoints and EC2 instances for months. Finance wants rightsizing recommendations and a list of idle resources based on their actual utilization history, across accounts in the organization. Which service fits?",
    "options": {
      "A": "SageMaker Inference Recommender",
      "B": "AWS Budgets",
      "C": "AWS Compute Optimizer",
      "D": "AWS Cost Explorer forecasts"
    },
    "correct_answer": "C",
    "explanation": "Compute Optimizer analyzes the configuration and CloudWatch utilization of existing resources, which now include Amazon SageMaker and EC2, and recommends rightsizing and idle-resource cleanup, with organization-wide views. Inference Recommender load-tests a model before you choose an instance. Budgets sets cost alerts. Cost Explorer shows and forecasts spend but doesn't make rightsizing recommendations."
  },
  {
    "number": 270, "skill": "4.2.5",
    "source": "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html",
    "question": "A team wants one place that inspects its whole AWS environment against AWS best practices and recommends ways to save money, improve availability and performance, close security gaps, and avoid hitting service limits. Which service fits?",
    "options": {
      "A": "AWS Trusted Advisor",
      "B": "AWS Config",
      "C": "Amazon Inspector",
      "D": "AWS Compute Optimizer"
    },
    "correct_answer": "A",
    "explanation": "Trusted Advisor inspects your environment and recommends where to save money, improve availability and performance, close security gaps, and stay within service limits. Config tracks configuration compliance with rules you set. Inspector finds software vulnerabilities. Compute Optimizer focuses on rightsizing resources. Note: full Trusted Advisor checks need a higher support plan, and the Basic plan gets the service limit checks plus selected security and fault-tolerance checks."
  },
  {
    "number": 271, "skill": "2.1.4",
    "source": "https://docs.aws.amazon.com/redshift/latest/dg/machine_learning.html",
    "question": "Analysts work entirely in SQL on Amazon Redshift. They want to train a churn model on a Redshift table and call it in SQL queries, without learning SageMaker AI or moving data by hand. Which solution meets these requirements?",
    "options": {
      "A": "Export the table to S3, train in SageMaker AI notebooks, and load predictions back into Redshift.",
      "B": "Use Amazon Redshift ML with CREATE MODEL, which uses SageMaker AI Autopilot behind the scenes and creates a SQL prediction function.",
      "C": "Use SageMaker Canvas and copy the predictions into Redshift each week.",
      "D": "Use Athena federated query with a Lambda function that calls a model."
    },
    "correct_answer": "B",
    "explanation": "Redshift ML lets SQL users run CREATE MODEL. Redshift exports the data, SageMaker AI Autopilot finds the best model, and Redshift registers a SQL function for predictions. Exporting and training in notebooks requires SageMaker skills. Canvas is no-code, but it means copying results back and forth. Athena with Lambda is custom glue."
  },
  {
    "number": 272, "skill": "3.3.5",
    "source": "https://docs.aws.amazon.com/mwaa/latest/userguide/what-is-mwaa.html",
    "question": "A data team already has 120 Apache Airflow DAGs that orchestrate data preparation, SageMaker AI training and batch scoring. It wants to move them to AWS with minimal rewriting and without managing Airflow servers. Which service fits?",
    "options": {
      "A": "Rewrite the DAGs as SageMaker AI Pipelines.",
      "B": "Rewrite the DAGs as AWS Step Functions state machines.",
      "C": "Amazon Managed Workflows for Apache Airflow (Amazon MWAA)",
      "D": "Run Airflow on a single Amazon EC2 instance."
    },
    "correct_answer": "C",
    "explanation": "MWAA is managed Apache Airflow. You keep your DAGs and Python code, AWS runs and scales the environment, and it includes operators for SageMaker AI and other AWS services. Rewriting in SageMaker AI Pipelines or Step Functions means rewriting everything. A self-managed EC2 instance is servers to manage."
  },
  {
    "number": 273, "skill": "2.1.5",
    "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-graphs.html",
    "question": "A RAG assistant answers single-fact questions well but fails on questions that require connecting facts across several documents. For example, 'Which suppliers of our recalled part also supply our top customer?' The documents are in Amazon S3. Which knowledge base option should the team use?",
    "options": {
      "A": "Increase the number of retrieved chunks to 100.",
      "B": "Switch to hierarchical chunking.",
      "C": "Enable a reranker model.",
      "D": "Build the knowledge base with Amazon Neptune Analytics GraphRAG."
    },
    "correct_answer": "D",
    "explanation": "GraphRAG with Neptune Analytics automatically finds relationships between entities across documents and traverses them, which helps with questions that need several logical steps across sources. More chunks, hierarchical chunking and reranking all improve ordinary retrieval, but none of them connects facts through relationships."
  },
  {
    "number": 274, "skill": "4.2.3",
    "source": "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html",
    "question": "Business managers want interactive dashboards of the churn model's weekly predictions, and they want to ask questions about the data in plain language. They have no ML or coding background, and the company wants a fully managed AWS service. Which service fits?",
    "options": {
      "A": "Amazon Quick (Quick Sight dashboards and natural-language chat)",
      "B": "Amazon CloudWatch dashboards",
      "C": "SageMaker AI Studio notebooks",
      "D": "Amazon Athena query editor"
    },
    "correct_answer": "A",
    "explanation": "Amazon Quick (which grew out of QuickSight) offers Quick Sight for interactive BI dashboards and natural-language chat over connected data, fully managed and with no ML expertise needed. CloudWatch dashboards show operational metrics. Studio notebooks and the Athena editor require code or SQL."
  },
  {
    "number": 275, "skill": "4.3.3",
    "source": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "question": "A company with 40 AWS accounts in AWS Organizations must ensure that no one in any member account, including account administrators, can create SageMaker AI endpoints outside two approved Regions. Which solution enforces this?",
    "options": {
      "A": "Attach an IAM policy to each administrator in each account.",
      "B": "Attach a service control policy (SCP) that denies SageMaker AI endpoint creation outside the approved Regions to the organizational units that contain the member accounts.",
      "C": "Create an AWS Config rule that flags endpoints in other Regions.",
      "D": "Create AWS Budgets alerts for each non-approved Region."
    },
    "correct_answer": "B",
    "explanation": "SCPs set the maximum permissions for all users and roles in member accounts, including the root user and administrators. Even an AdministratorAccess policy can't override an SCP deny. Per-user IAM policies can be changed by the account's own admins. Config and Budgets detect problems after the fact but don't prevent them."
  },
  {
    "number": 276, "skill": "4.3.5",
    "source": "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    "question": "A member account's SCP allows all SageMaker AI actions. A new data scientist's IAM role has no attached policies, and every SageMaker AI API call gets AccessDenied. Why?",
    "options": {
      "A": "SCPs don't apply to SageMaker AI.",
      "B": "The management account must approve each new role.",
      "C": "SCPs never grant permissions. The role still needs an IAM identity-based policy that allows the SageMaker AI actions.",
      "D": "The SCP must be attached directly to the role."
    },
    "correct_answer": "C",
    "explanation": "AWS states that SCPs never grant permissions. They only set the maximum allowed. Effective access is the overlap between what the SCP allows and what IAM policies grant, so a role with no policies has no access. SCPs do apply to SageMaker AI. There's no per-role approval step. SCPs attach to the organization root, OUs or accounts, not to roles."
  },
  {
    "number": 277, "skill": "4.2.2",
    "source": "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html",
    "question": "Prediction requests flow through Amazon API Gateway to a Lambda function that enriches features and then calls a SageMaker AI endpoint. End-to-end latency has doubled, and the team needs to see which hop in the request path is slow. Which service helps the MOST?",
    "options": {
      "A": "AWS CloudTrail",
      "B": "SageMaker Model Monitor",
      "C": "Amazon CodeGuru Profiler",
      "D": "AWS X-Ray, using its trace map of the request path"
    },
    "correct_answer": "D",
    "explanation": "X-Ray traces each request through your application and its downstream calls, and its trace map shows bottlenecks and latency spikes per service. CloudTrail records API calls for auditing, not latency. Model Monitor checks data and prediction quality. CodeGuru Profiler finds slow code inside one application, not which hop in a chain is slow."
  },
  {
    "number": 278, "skill": "1.1.2",
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "question": "Training datasets older than one year are accessed about once a quarter for audits, but when auditors request them, the data must be available within milliseconds. Which S3 storage class is MOST cost-effective?",
    "options": {
      "A": "S3 Glacier Instant Retrieval",
      "B": "S3 Glacier Flexible Retrieval",
      "C": "S3 Glacier Deep Archive",
      "D": "S3 Standard"
    },
    "correct_answer": "A",
    "explanation": "AWS describes Glacier Instant Retrieval as being for long-lived archive data accessed about once a quarter with millisecond access. Flexible Retrieval takes minutes to hours and requires restoring first. Deep Archive takes hours. S3 Standard is fast but costs more for data that's rarely used."
  },
  {
    "number": 279, "skill": "1.1.2",
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "question": "A company must keep retired model artifacts and raw training data for 7 years for compliance. The data will almost never be read, and retrieval taking hours is acceptable. Which S3 storage class is MOST cost-effective?",
    "options": {
      "A": "S3 Standard-IA",
      "B": "S3 Glacier Instant Retrieval",
      "C": "S3 Glacier Deep Archive",
      "D": "S3 One Zone-IA"
    },
    "correct_answer": "C",
    "explanation": "Deep Archive is the lowest-cost class, for data accessed less than once a year with retrieval in hours, which fits this case. Standard-IA and One Zone-IA are for millisecond access to data used about monthly. Glacier Instant Retrieval charges more to keep millisecond access you don't need."
  },
  {
    "number": 280, "skill": "1.1.2",
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "question": "A feature store's offline data in Amazon S3 has unpredictable access: some partitions are read daily for weeks and then never again, and the team can't predict which. The team wants storage costs to drop automatically, with no retrieval fees and no lifecycle rules to maintain. Which storage class fits?",
    "options": {
      "A": "S3 Standard-IA with a lifecycle rule after 30 days",
      "B": "S3 Intelligent-Tiering",
      "C": "S3 Glacier Flexible Retrieval",
      "D": "S3 One Zone-IA"
    },
    "correct_answer": "B",
    "explanation": "Intelligent-Tiering is AWS's class for unknown or changing access patterns. It moves objects between tiers automatically, with no retrieval fees and no lifecycle rules to maintain. Standard-IA has retrieval fees and needs a lifecycle rule. Glacier Flexible Retrieval needs a restore before reading. One Zone-IA has retrieval fees and is less resilient."
  },
  {"number": 281, "skill": "3.3.2", "source": "https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html", "question": "Every merge to the main branch must run unit tests on the inference code, build a Docker image, and push it to Amazon ECR, with no build servers to manage. Which service should run this pipeline stage?", "options": {"A": "AWS CodeDeploy", "B": "A SageMaker AI processing job", "C": "AWS CodeBuild", "D": "An AWS Lambda function that runs docker build"}, "correct_answer": "C", "explanation": "CodeBuild is AWS's fully managed build service. It compiles code, runs unit tests and produces deployable artifacts, and CodePipeline can use it as a build or test action. CodeDeploy deploys finished artifacts but doesn't build them. A processing job is for data processing and model evaluation, not software builds. Lambda isn't designed to run Docker builds."},
  {"number": 282, "skill": "3.3.2", "source": "https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html", "question": "After CodeBuild packages a new model, a pipeline must create or update a SageMaker AI endpoint that is defined in a CloudFormation template. A team member suggests AWS CodeDeploy. What should the pipeline use?", "options": {"A": "A CodeDeploy deployment group that targets the SageMaker AI endpoint", "B": "A CodePipeline deploy action that uses AWS CloudFormation to create or update the stack", "C": "A CodeDeploy in-place deployment to the endpoint's instances", "D": "A CodeDeploy blue/green deployment with a canary configuration on the endpoint"}, "correct_answer": "B", "explanation": "AWS documents CodeDeploy's compute platforms as EC2/on-premises, AWS Lambda and Amazon ECS. SageMaker AI endpoints aren't among them, so every CodeDeploy option fails. A CloudFormation deploy action in CodePipeline creates or updates the stack that defines the endpoint. For canary or linear traffic shifting on a SageMaker AI endpoint, use SageMaker AI's own deployment guardrails."},
  {"number": 283, "skill": "3.3.1", "source": "https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html", "question": "A feature-enrichment microservice that feeds a model runs on Amazon ECS. The team wants each new version deployed as blue/green, with a small percentage of traffic shifted first and automatic rollback on errors. Which service handles this deployment?", "options": {"A": "AWS CodeDeploy with an ECS blue/green deployment and a canary configuration", "B": "SageMaker AI deployment guardrails", "C": "AWS CodeBuild", "D": "AWS CloudFormation drift detection"}, "correct_answer": "A", "explanation": "For Amazon ECS, CodeDeploy runs blue/green deployments that shift traffic with canary, linear or all-at-once configurations, and it can stop and roll back on errors. SageMaker AI deployment guardrails apply to SageMaker AI endpoints, not ECS services. CodeBuild builds but doesn't deploy. Drift detection finds configuration changes but doesn't deploy anything."},
  {"number": 284, "skill": "3.3.1", "source": "https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html", "question": "A pipeline deploys a model to staging, then must stop until a release manager approves before the production stage, and the manager should be notified by email. What happens if no one approves or rejects within seven days?", "options": {"A": "The pipeline automatically continues to production.", "B": "The approval is extended for another seven days.", "C": "The pipeline sends a reminder and waits indefinitely.", "D": "The action is treated as failed, and the pipeline execution does not continue."}, "correct_answer": "D", "explanation": "A CodePipeline manual approval action stops the pipeline until someone with permission approves or rejects it. It can notify approvers through an Amazon SNS topic, for example by email. AWS documents that if no response arrives within seven days, the action is marked failed and the execution doesn't continue. It never continues to production automatically."},
  {"number": 285, "skill": "3.2.2", "source": "https://docs.aws.amazon.com/cdk/v2/guide/home.html", "question": "An ML platform team writes Python every day and wants to define its SageMaker AI endpoints, IAM roles and alarms as infrastructure as code, using loops and reusable components, while still deploying through CloudFormation with rollback on error. Which tool fits?", "options": {"A": "AWS CDK", "B": "Hand-written CloudFormation YAML templates", "C": "AWS Service Catalog", "D": "AWS Systems Manager Automation documents"}, "correct_answer": "A", "explanation": "The AWS CDK lets you define infrastructure in programming languages including Python, with reusable constructs, and deploys through CloudFormation with rollback on error. Hand-written YAML works, but it doesn't give the team Python loops and composition. Service Catalog distributes approved products and isn't an authoring tool. Systems Manager Automation runs operational tasks."},
  {"number": 286, "skill": "1.1.7", "source": "https://docs.aws.amazon.com/documentdb/latest/developerguide/vector-search.html", "question": "A retailer's product catalog is stored as JSON documents in an Amazon DocumentDB 5.0 instance-based cluster. The team wants semantic search and product recommendations using embeddings stored next to the existing documents, without adding another database. Which solution fits?", "options": {"A": "Use vector search for Amazon DocumentDB with an HNSW vector index on the embedding field.", "B": "Copy the catalog to Amazon OpenSearch Serverless and search there.", "C": "Store the embeddings in Amazon DynamoDB.", "D": "Use Amazon Kendra on an export of the catalog."}, "correct_answer": "A", "explanation": "DocumentDB 5.0 instance-based clusters support vector search. You store vectors in your existing JSON documents and add an HNSW or IVFFlat index, and AWS recommends HNSW for most cases. OpenSearch Serverless and Kendra both mean adding and syncing another service. DynamoDB has no native vector similarity search."},
  {"number": 287, "skill": "1.1.1", "source": "https://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html", "question": "Lab instruments in an on-premises facility continuously write result files to an NFS share. The ML team needs these files in Amazon S3 for training without changing the instruments, and the lab wants low-latency local access to recent files. Which solution fits?", "options": {"A": "Run AWS DataSync once a week to copy the share to S3.", "B": "Deploy an Amazon S3 File Gateway on premises and point the instruments at its NFS share.", "C": "Rewrite the instrument software to call the S3 API directly.", "D": "Ship the data to AWS on a Snowball device every month."}, "correct_answer": "B", "explanation": "S3 File Gateway gives on-premises applications an NFS or SMB file share that stores files as S3 objects, with local caching for low-latency access, so the instruments keep writing to a file share with no changes. DataSync moves data on a schedule, so it's not continuous and has no local cache. Rewriting the instruments violates the 'no changes' requirement. Monthly Snowball shipments are slow and manual."},
  {"number": 288, "skill": "2.1.8", "source": "https://docs.aws.amazon.com/polly/latest/dg/what-is.html", "question": "An accessibility app generates text summaries with a foundation model and must read them aloud to visually impaired users in a natural, lifelike voice, in several languages. Which service should convert the summaries to audio?", "options": {"A": "Amazon Transcribe", "B": "Amazon Lex", "C": "Amazon Polly", "D": "Amazon Translate"}, "correct_answer": "C", "explanation": "Amazon Polly converts text into lifelike speech in many languages and voices, and AWS lists accessibility apps as a common use case. Transcribe does the opposite (speech to text). Lex builds conversational bots. Translate converts text between languages but doesn't speak it."}
].map(q => ({ topic: "Topic 4 - C02 In-scope Services", origin: "written", ...q })));
