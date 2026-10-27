# MLA-C02 coverage report

Generated from the 308 questions in this repository (exam_data3.js plus the exam_data3_c02 files), checked against AWS's official [MLA-C02 in-scope services list](https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-02/mla-02-in-scope-services.html).

**How to read this:** a question counts if the service is mentioned anywhere in it (question, options or explanation). A mention as a wrong answer still counts, so a number shows you've *seen* the service, not that every feature is covered. **0 means it never appears. Study it from the AWS docs before your exam.**

| Category | Service | Questions mentioning it | Status |
|---|---|---|---|
| Analytics | Amazon Athena | 20 | Covered |
| Analytics | Amazon Data Firehose | 6 | Covered |
| Analytics | Amazon EMR | 8 | Covered |
| Analytics | AWS Glue | 36 | Covered |
| Analytics | AWS Glue DataBrew | 11 | Covered |
| Analytics | AWS Glue Data Quality | 4 | Covered |
| Analytics | Amazon Kinesis | 7 | Covered |
| Analytics | AWS Lake Formation | 2 | Thin (1–2) |
| Analytics | Amazon Managed Service for Apache Flink | 5 | Covered |
| Analytics | Amazon OpenSearch Service | 6 | Covered |
| Analytics | Amazon Quick | 5 | Covered |
| Analytics | Amazon Redshift | 7 | Covered |
| Application Integration | Amazon EventBridge | 11 | Covered |
| Application Integration | Amazon MWAA | 2 | Thin (1–2) |
| Application Integration | Amazon SNS | 8 | Covered |
| Application Integration | Amazon SQS | 5 | Covered |
| Application Integration | AWS Step Functions | 5 | Covered |
| Cloud Financial Management | AWS Billing and Cost Management | 1 | Thin (1–2) |
| Cloud Financial Management | AWS Budgets | 5 | Covered |
| Cloud Financial Management | AWS Cost Explorer | 4 | Covered |
| Compute | AWS Batch | 8 | Covered |
| Compute | Amazon EC2 | 25 | Covered |
| Compute | AWS Lambda | 57 | Covered |
| Containers | Amazon ECR | 9 | Covered |
| Containers | Amazon ECS | 11 | Covered |
| Containers | Amazon EKS | 5 | Covered |
| Database | Amazon DocumentDB | 1 | Thin (1–2) |
| Database | Amazon DynamoDB | 10 | Covered |
| Database | Amazon ElastiCache | 2 | Thin (1–2) |
| Database | Amazon Neptune | 3 | Covered |
| Database | Amazon RDS | 10 | Covered |
| Developer Tools | AWS CDK | 1 | Thin (1–2) |
| Developer Tools | AWS CodeArtifact | 2 | Thin (1–2) |
| Developer Tools | AWS CodeBuild | 4 | Covered |
| Developer Tools | AWS CodeCommit | 1 | Thin (1–2) |
| Developer Tools | AWS CodeConnections | 1 | Thin (1–2) |
| Developer Tools | AWS CodeDeploy | 3 | Covered |
| Developer Tools | AWS CodePipeline | 6 | Covered |
| Developer Tools | AWS X-Ray | 3 | Covered |
| Machine Learning and AI | Amazon Bedrock | 68 | Covered |
| Machine Learning and AI | Amazon Bedrock AgentCore | 7 | Covered |
| Machine Learning and AI | Amazon CodeGuru | 3 | Covered |
| Machine Learning and AI | Amazon Comprehend | 14 | Covered |
| Machine Learning and AI | Amazon Comprehend Medical | 3 | Covered |
| Machine Learning and AI | Amazon DevOps Guru | 1 | Thin (1–2) |
| Machine Learning and AI | AWS HealthLake | 1 | Thin (1–2) |
| Machine Learning and AI | Amazon Lex | 3 | Covered |
| Machine Learning and AI | Amazon Personalize | 2 | Thin (1–2) |
| Machine Learning and AI | Amazon Polly | 1 | Thin (1–2) |
| Machine Learning and AI | Amazon Rekognition | 5 | Covered |
| Machine Learning and AI | Amazon SageMaker AI | 167 | Covered |
| Machine Learning and AI | Amazon Textract | 3 | Covered |
| Machine Learning and AI | Amazon Transcribe | 2 | Thin (1–2) |
| Machine Learning and AI | Amazon Translate | 2 | Thin (1–2) |
| Management and Governance | AWS Auto Scaling | 11 | Covered |
| Management and Governance | AWS CloudFormation | 7 | Covered |
| Management and Governance | AWS CloudTrail | 13 | Covered |
| Management and Governance | Amazon CloudWatch | 26 | Covered |
| Management and Governance | AWS Compute Optimizer | 4 | Covered |
| Management and Governance | AWS Config | 5 | Covered |
| Management and Governance | AWS Organizations | 4 | Covered |
| Management and Governance | AWS Service Catalog | 2 | Thin (1–2) |
| Management and Governance | AWS Systems Manager | 4 | Covered |
| Management and Governance | AWS Trusted Advisor | 3 | Covered |
| Media | Amazon Kinesis Video Streams | 1 | Thin (1–2) |
| Migration and Transfer | AWS DataSync | 3 | Covered |
| Networking and Content Delivery | Amazon API Gateway | 8 | Covered |
| Networking and Content Delivery | Amazon CloudFront | 2 | Thin (1–2) |
| Networking and Content Delivery | AWS Direct Connect | 2 | Thin (1–2) |
| Networking and Content Delivery | Amazon VPC | 13 | Covered |
| Security, Identity, and Compliance | IAM | 21 | Covered |
| Security, Identity, and Compliance | Amazon Inspector | 5 | Covered |
| Security, Identity, and Compliance | AWS KMS | 11 | Covered |
| Security, Identity, and Compliance | Amazon Macie | 8 | Covered |
| Security, Identity, and Compliance | AWS Secrets Manager | 3 | Covered |
| Storage | Amazon EBS | 1 | Thin (1–2) |
| Storage | Amazon EFS | 5 | Covered |
| Storage | Amazon FSx | 5 | Covered |
| Storage | Amazon S3 | 93 | Covered |
| Storage | Amazon S3 Glacier | 5 | Covered |
| Storage | AWS Storage Gateway | 1 | Thin (1–2) |

## Not covered at all (0)

- None

## Thin coverage, 1–2 questions (21)

- AWS Lake Formation (#10, #42)
- Amazon MWAA (#79, #272)
- AWS Billing and Cost Management (#83)
- Amazon DocumentDB (#286)
- Amazon ElastiCache (#74, #123)
- AWS CDK (#285)
- AWS CodeArtifact (#112, #267)
- AWS CodeCommit (#240)
- AWS CodeConnections (#240)
- Amazon DevOps Guru (#257)
- AWS HealthLake (#258)
- Amazon Personalize (#255, #256)
- Amazon Polly (#288)
- Amazon Transcribe (#31, #288)
- Amazon Translate (#31, #288)
- AWS Service Catalog (#225, #285)
- Amazon Kinesis Video Streams (#259)
- Amazon CloudFront (#65, #118)
- AWS Direct Connect (#64, #120)
- Amazon EBS (#83)
- AWS Storage Gateway (#287)

## Known limits of this report

- AWS marks the in-scope list as non-exhaustive and subject to change.
- A service mention doesn't prove feature-level coverage. For example, SageMaker AI appears in most questions, but individual SageMaker AI features may still be thin.
- The original 145-question bank appears to be community-sourced, and some of its answers may be wrong. Questions 146 and up were written from the official exam guide, and questions 250 and up each cite the AWS documentation page they were written from.
- ElastiCache vector search and semantic caching have no verified question, because the AWS documentation page couldn't be fetched when these questions were written.

## Researched C02 distinctions

These distinctions come from public C02 study guides: SaveMyCert's MLA-C02 comparisons (CC BY 4.0) and a published exam-experience blog. Each one is checked here against the question data.

| Distinction | Questions | Status |
|---|---|---|
| Robust vs standard vs min-max scaling | 2 | Thin |
| Glue Data Quality row-level outcomes vs DataBrew rulesets | 1 | Thin |
| Reinforcement fine-tuning | 1 | Thin |
| Warm start types | 2 | Thin |
| Local SHAP vs partial dependence | 2 | Thin |
| L1/L2 regularization (alpha/lambda) | 1 | Thin |
| Ensembling / stacking / boosting | 1 | Thin |
| InvocationLatency vs TimeToFirstToken | 1 | Thin |
| SageMaker AI vs Compute Savings Plans | 1 | Thin |
| Bedrock service tiers (Flex, Priority, Reserved, Standard) | 2 | Thin |
| Budgets actions vs Cost Anomaly Detection | 2 | Thin |
| Inspector SBOM Generator vs ECR scanning | 1 | Thin |
| TargetVariant vs UpdateEndpointWeightsAndCapacities | 2 | Thin |
| CloudFormation dynamic references | 1 | Thin |
| HNSW vs IVFFlat | 1 | Thin |
| MCP vs A2A | 1 | Thin |
| Network isolation vs VPC configuration | 3 | Covered |
| Data drift vs concept drift | 3 | Covered |
| Shadow vs production variant | 6 | Covered |
| Bedrock on-demand / Provisioned / cross-Region / batch | 4 | Covered |
| Retrieve vs RetrieveAndGenerate | 2 | Thin |
| AgentCore Memory short vs long term | 2 | Thin |
| SageMaker deployment guardrails vs CodeDeploy | 3 | Covered |
| Data parallel vs model parallel | 2 | Thin |
| Bayesian / random / grid / Hyperband | 2 | Thin |
| Inferentia vs Trainium vs Graviton | 1 | Thin |
| Enhanced fan-out vs retention | 2 | Thin |
| CloudTrail vs invocation logging vs Config | 3 | Covered |
| Bedrock API keys vs IAM roles | 3 | Covered |
| RAG evaluation metrics (faithfulness, citation precision/coverage) | 0 | Not covered |

RAG evaluation metric definitions are not covered by a verified question, because the AWS page that defines them couldn't be fetched.

## Questions per exam domain

Used by the simulator's Focus Area option. Retired ordering and matching questions are excluded by default.

| Domain | Questions |
|---|---|
| 1. Data Preparation for ML and AI | 74 |
| 2. ML Model and Foundation Model Development | 93 |
| 3. Deployment and Orchestration | 66 |
| 4. Operating, Monitoring, and Securing | 75 |

Questions 146 and up are tagged from the exam-guide skill each was written for. Tags on the original bank (1–145) were assigned by reading each question against the guide's task statements, so treat them as approximate.

## MLA-C01 coverage (added 2026-10-27)

Checked against the official MLA-C01 exam guide. AWS's English pages are gone, but the Korean, Japanese and Chinese editions are still live, for example
https://docs.aws.amazon.com/ko_kr/aws-certification/latest/machine-learning-engineer-associate-01/mla-01-in-scope-services.html.

**What the original 145-question bank never tested:** 20 of the 86 in-scope services and 10 skills the guide names.

**What fills the gaps now:**
- Questions #309–340 (`exam_data3_c01gap.js`) were written by Claude, each from the AWS page linked in its `source` field. They cover:
  - Neo (compilation and quantization)
  - Role Manager
  - Lambda Insights, Logs Insights
  - S3 Transfer Acceleration
  - RecordIO-protobuf
  - EBS Provisioned IOPS
  - Gitflow / GitHub Flow
  - AUC/ROC, confusion matrix, stacking
  - Step Functions .sync
  - BYOC
  - Lambda provisioned concurrency
  - AWS Chatbot
  - Serverless Application Repository
  - Service Catalog
  - DataSync, Direct Connect
  - Secrets Manager rotation
  - Lake Formation
  - Textract, Comprehend Medical, Transcribe, Translate, Lex
  - Kendra, Mechanical Turk, Fraud Detector, Lookout
- Already-written questions that also match C01 skills are tagged `c01` through the `C01_ALSO` list (78 questions). They cover CodeBuild/CodeDeploy, Personalize, Polly, Trusted Advisor, Config, Organizations, X-Ray, CDK, DocumentDB, Storage Gateway, HealthLake, Kinesis Video Streams, DevOps Guru, CodeGuru, catastrophic forgetting, ensembles, blue/green/canary/linear, and more.

**C01 mode pool:** 253 questions (145 bank + 32 gap + 76 overlap). By domain: D1 70, D2 69, D3 59, D4 55.

**Still thin:** Each gap service has 1–2 questions. Tokenization and Reserved Instances are touched only lightly. Lookout for Vision and Lookout for Metrics are named in an explanation, but no question tests them.

**Availability notes from AWS docs** (these services are still in the C01 guide):
- Closed to new customers: Fraud Detector (2025-11-07), Kendra, Role Manager.
- Shut down: Mechanical Turk (2026-09-30), Lookout for Equipment (2026-10-07).
