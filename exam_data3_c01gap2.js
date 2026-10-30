// MLA-C01 Domain 1-2 gap fill (414-438). Written by Claude on 2026-10-30 after an item-by-item audit of the C01 guide's
// Domain 1 and 2 "Knowledge of" and "Skills in" lists against questions #341-413. Each fills an item that had no question.
// Unless marked "concept", each was written after reading the AWS documentation page in its "source" field.
EXAM_DATA.push(...[
  {
    "number": 414, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "question": "A team keeps 200 TB of historical training data in Amazon S3. The data can't be re-created. It is read about once a quarter during a scheduled retraining job, and the job needs millisecond access when it runs. Which storage class is MOST cost-effective?",
    "options": {
      "A": "S3 Standard",
      "B": "S3 One Zone-IA",
      "C": "S3 Glacier Instant Retrieval",
      "D": "S3 Glacier Deep Archive"
    },
    "correct_answer": "C",
    "explanation": "AWS describes Glacier Instant Retrieval as for 'long-lived, archive data accessed once a quarter with millisecond access', which matches this case exactly. A costs more for data that's rarely read. B stores data in one Availability Zone and isn't resilient to losing that zone; AWS recommends it only for data you can re-create. D is cheapest, but data must be restored first and retrieval takes hours, so it isn't millisecond access. Rule of thumb: monthly → Standard-IA, quarterly → Glacier Instant Retrieval, yearly → Flexible Retrieval, almost never → Deep Archive."
  },
  {
    "number": 415, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    "question": "A feature data lake in Amazon S3 has unpredictable access: some prefixes are hot for weeks, then untouched for months, and no one can predict which. The team wants lower storage costs with no retrieval fees and no lifecycle rules to maintain. Which storage class fits?",
    "options": {
      "A": "S3 Intelligent-Tiering",
      "B": "S3 Standard-IA",
      "C": "S3 Glacier Flexible Retrieval",
      "D": "S3 Express One Zone"
    },
    "correct_answer": "A",
    "explanation": "AWS: Intelligent-Tiering 'is the ideal storage class when you want to optimize storage costs for data that has unknown or changing access patterns.' It moves objects between tiers automatically, and 'there are no retrieval fees.' It's a thermostat that adjusts itself. B charges a retrieval fee every time the data is read, which hurts during hot weeks. C needs a restore before data can be read. D is for single-digit-millisecond latency in one Availability Zone, not for saving costs."
  },
  {
    "number": 416, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataExport.HowItWorks.html",
    "question": "A production Amazon DynamoDB table backs a customer-facing app. The ML team needs a full copy of the table in Amazon S3 for training WITHOUT affecting the table's read capacity or performance. What should they use?",
    "options": {
      "A": "An AWS Glue job that runs a full table Scan every night.",
      "B": "DynamoDB Streams with a Lambda function that writes every change to S3.",
      "C": "A script on Amazon EC2 that pages through the table with Query calls.",
      "D": "DynamoDB export to S3, with point-in-time recovery (PITR) turned on for the table."
    },
    "correct_answer": "D",
    "explanation": "AWS: exports 'don't consume read capacity units (RCUs) and have no impact on table performance and availability.' PITR must be turned on, and exports can be full or incremental, in DynamoDB JSON or Amazon Ion format. A and C read through the table, so they consume capacity and can slow the app. B captures only changes going forward, not a full copy, and means building and running a pipeline."
  },
  {
    "number": 417, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html",
    "question": "A company runs Apache Kafka on premises. Dozens of producer and consumer applications use Kafka client libraries. It wants to move streaming ingestion for ML features to AWS WITHOUT changing application code. Which service fits?",
    "options": {
      "A": "Amazon Kinesis Data Streams",
      "B": "Amazon Managed Streaming for Apache Kafka (Amazon MSK)",
      "C": "Amazon Data Firehose",
      "D": "Amazon SQS"
    },
    "correct_answer": "B",
    "explanation": "AWS: MSK 'runs open-source versions of Apache Kafka. This means existing applications, tooling, and plugins... are supported without requiring changes to application code.' MSK Serverless also removes capacity management. A and C use the Kinesis and Firehose APIs, so every producer and consumer would need rewriting. D is a message queue, not a Kafka-compatible stream."
  },
  {
    "number": 418, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/machine-learning.html",
    "question": "A customer table built from three merged CRM systems contains duplicates such as 'Jon Doe', 'Johnny Doe' and 'John Doe' with the same birthday. There is no common customer ID, and no field matches exactly. The team wants to deduplicate before training, with no custom ML code. What should they use?",
    "options": {
      "A": "SELECT DISTINCT in Amazon Athena.",
      "B": "The SageMaker Data Wrangler drop duplicates transform.",
      "C": "The AWS Lake Formation FindMatches ML transform, taught with labeled example matches and run in an AWS Glue job.",
      "D": "Amazon Macie sensitive data discovery."
    },
    "correct_answer": "C",
    "explanation": "AWS: FindMatches finds 'duplicate or matching records in your dataset, even when the records do not have a common unique identifier and no fields match exactly', with no code or ML knowledge needed. You teach it by labeling sample sets (for example, Jon/Johnny/John Doe = match), and it outputs a match_id column or removes the duplicates. A and B remove only exact duplicates, so 'Jon' and 'John' survive as separate people. D finds sensitive data, not duplicates."
  },
  {
    "number": 419, "domain": 1, "task": "1.2", "concept": true,
    "question": "Customer age has a strong but non-linear effect on churn: very young and very old customers churn more. The team uses logistic regression and wants to capture this pattern with a simple feature transformation. Ages are unevenly distributed. What should they do?",
    "options": {
      "A": "Bin age into quantile-based buckets (each bucket holds a similar number of customers) and one-hot encode the buckets.",
      "B": "Min-max scale age to the range 0 to 1.",
      "C": "Apply a log transformation to age.",
      "D": "Drop age, because linear models can't use it."
    },
    "correct_answer": "A",
    "explanation": "Binning turns a number into ranges so a linear model can give each range its own weight. That lets it learn a U-shape: high, low, high. Quantile (equal-frequency) bins make sure no bucket is nearly empty when ages are uneven. It's like grouping students by grade instead of exact age. B and C keep a single smooth trend, so a straight line still can't bend twice. D throws away a strong signal. (Standard ML concept; the C01 guide lists binning under Task 1.2.)"
  },
  {
    "number": 420, "domain": 1, "task": "1.2", "concept": true,
    "question": "A delivery-time model has a raw order_timestamp column (for example, 2026-11-06 18:45:00) and a full_address column. The model misses rush-hour and neighborhood effects. Which feature engineering step MOST directly helps?",
    "options": {
      "A": "One-hot encode the full timestamp string.",
      "B": "Drop both columns to reduce dimensionality.",
      "C": "Standardize the timestamp as a number of seconds.",
      "D": "Split the features: derive hour of day and day of week from the timestamp, and city and postal code from the address."
    },
    "correct_answer": "D",
    "explanation": "Feature splitting pulls out the parts that carry the pattern. Rush hour lives in the hour-of-day part, and neighborhoods live in the postal code. A full timestamp string is unique for almost every row, so A creates millions of useless columns. C turns time into one ever-increasing number, so the model can't see that 6 pm repeats every day. B throws the signal away. (Standard ML concept; the C01 guide lists feature splitting under Task 1.2.)"
  },
  {
    "number": 421, "domain": 1, "task": "1.2", "concept": true,
    "question": "A clean categorical column store_id has 1,000 distinct values (no typos). One-hot encoding would add 1,000 columns, and the team wants a compact, deterministic encoding that does NOT imply any order between stores. Which encoding fits BEST?",
    "options": {
      "A": "Label encoding (0–999) used as a single numeric feature.",
      "B": "Binary encoding: give each store an integer, then write that integer in binary across about 10 columns.",
      "C": "Similarity encoding.",
      "D": "Leave the column as raw text."
    },
    "correct_answer": "B",
    "explanation": "Binary encoding stores 1,000 categories in about 10 columns (2^10 = 1,024), with no fake ordering in a single number. A packs everything into one number, which tells a linear model that store 999 is 'bigger' than store 1. C is designed for noisy strings with typos; these IDs are clean. D isn't usable by most algorithms. (Standard ML concept; the C01 guide names binary encoding under Task 1.2.)"
  },
  {
    "number": 422, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-workforce-management.html",
    "question": "A hospital needs bounding boxes drawn on confidential X-ray images. Contracts say only the hospital's own trained radiology staff may see the images. Which Ground Truth workforce should it use?",
    "options": {
      "A": "A private workforce made of the hospital's own staff, managed through Amazon Cognito or the hospital's OIDC identity provider.",
      "B": "A vendor-managed workforce from AWS Marketplace.",
      "C": "A public crowdsourced workforce.",
      "D": "Automated data labeling only, with no human workers."
    },
    "correct_answer": "A",
    "explanation": "Ground Truth lets you use a vendor-managed workforce or 'create your own private workforce', managed with Amazon Cognito or your own OIDC identity provider. A private team keeps the images among approved staff. B and C send the images to people outside the hospital. D still needs human labels to start (and at least 1,250 objects), and it isn't the 'only our staff' control the contracts require."
  },
  {
    "number": 423, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/databrew/latest/dg/profile.data-quality-rules.html",
    "question": "Business analysts prepare a training dataset in AWS Glue DataBrew. Before each weekly hand-off they must confirm that no key column has more than 5% missing values, and they want a notification when the check fails. They don't write code. What should they set up?",
    "options": {
      "A": "AWS Glue Data Quality inside a PySpark ETL job.",
      "B": "An Amazon Macie discovery job.",
      "C": "A DataBrew ruleset with data quality rules attached to a profile job, plus an Amazon EventBridge rule that sends a notification on a FAILED validation result.",
      "D": "Amazon CloudWatch Logs Insights queries against the dataset."
    },
    "correct_answer": "C",
    "explanation": "DataBrew rulesets hold rules such as 'number of missing values in column X doesn't exceed 5%.' You add a ruleset to a profile job, which produces a validation report. DataBrew then sends an event with SUCCEEDED or FAILED, which EventBridge can route to SNS or Lambda. All of this is visual, no code. A works, but it means building a Glue ETL job, which the analysts don't do. B looks for sensitive data. D queries logs, not datasets."
  },
  {
    "number": 424, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html",
    "question": "Training data in Amazon S3 is already encrypted by default with SSE-S3. A new compliance rule says the company must control the key's policy and be able to disable the key, while S3 still handles the encryption automatically. What should the team use?",
    "options": {
      "A": "Keep SSE-S3.",
      "B": "SSE-KMS with a customer managed AWS KMS key, set as the bucket's default encryption (and re-encrypt existing objects, for example with S3 Batch Operations Copy).",
      "C": "SSE-C, with the key sent in every request.",
      "D": "Client-side encryption in every application."
    },
    "correct_answer": "B",
    "explanation": "SSE-S3 is the automatic default, but AWS owns and manages those keys. SSE-KMS with a customer managed key lets you write the key policy and disable or rotate the key, while S3 still encrypts on the server side. AWS also notes that changing the default doesn't re-encrypt existing objects; use S3 Batch Operations Copy for those. C makes every application supply and protect the key on every call. D moves all encryption work into your own code. A doesn't give you control of the key."
  },
  {
    "number": 425, "domain": 1, "task": "1.3", "concept": true,
    "question": "Two problems appear in a loan dataset: (1) training data came only from customers who applied through the mobile app, so older customers are barely present; (2) one branch's income field was entered in thousands while other branches used dollars. Which pair of labels is correct?",
    "options": {
      "A": "(1) measurement bias, (2) selection bias",
      "B": "(1) label bias, (2) class imbalance",
      "C": "(1) confirmation bias, (2) data leakage",
      "D": "(1) selection bias, (2) measurement bias"
    },
    "correct_answer": "D",
    "explanation": "Selection bias = the way the data was collected leaves out part of the population (only app users, so few older people). Fix it by collecting from other channels or reweighting. Measurement bias = the values themselves are recorded wrongly or inconsistently (thousands vs dollars). Fix the collection process or standardize units. Clarify's pre-training metrics such as CI can reveal the underrepresented group. (Standard ML concept; Task 1.3 names selection and measurement bias.)"
  },
  {
    "number": 426, "domain": 1, "task": "1.3", "concept": true,
    "question": "A non-time-series dataset was exported sorted by label: all class-0 rows first, then all class-1 rows. The engineer used the first 80% of rows for training and the last 20% for validation. Validation accuracy is meaningless. What is the fix?",
    "options": {
      "A": "Shuffle the rows randomly (or use a stratified split) before splitting into training and validation sets.",
      "B": "Train for more epochs.",
      "C": "Use the first 20% of rows for validation instead.",
      "D": "Remove class 1."
    },
    "correct_answer": "A",
    "explanation": "Because the file is sorted, the training set holds almost all class 0 and the validation set holds almost all class 1, so the model never learns class 1 properly. Shuffling (or stratifying) gives both sets the same mix. It's like shuffling a deck sorted by suit before dealing. C has the same problem in reverse. B and D don't fix the split. (Exception: real time series should be split by time, not shuffled.)"
  },
  {
    "number": 427, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/transcribe/latest/dg/improving-accuracy.html",
    "question": "A marine research institute transcribes thousands of hours of lectures. Amazon Transcribe keeps choosing the wrong homophone (for example, 'flow' instead of 'ice floe') because it misses the context. The institute has a large collection of domain text: papers and lecture notes. Which feature fits BEST?",
    "options": {
      "A": "A custom vocabulary listing 'floe'.",
      "B": "Amazon Translate custom terminology.",
      "C": "A custom language model trained on the domain text.",
      "D": "Amazon Comprehend custom entity recognition."
    },
    "correct_answer": "C",
    "explanation": "AWS: custom language models 'capture the context associated with terms' using 'a large volume of domain-specific text data', and AWS's own example is learning 'floe' (ice floe) vs 'flow'. A custom vocabulary (A) boosts specific words in all contexts and suits brand names and acronyms, but it doesn't learn context. AWS also notes that custom vocabulary effects such as DisplayAs aren't applied when a custom language model is active. B is for translation. D works on text that's already transcribed."
  },
  {
    "number": 428, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/transcribe/latest/dg/improving-accuracy.html",
    "question": "A call center's Amazon Transcribe output misspells about 40 product names and acronyms. The company has no large text corpus, just the list of terms and how they should appear. What should it use?",
    "options": {
      "A": "A custom vocabulary with the terms (and optionally pronunciations and display forms).",
      "B": "A custom language model.",
      "C": "Train a new speech model in SageMaker AI.",
      "D": "Amazon Polly lexicons."
    },
    "correct_answer": "A",
    "explanation": "AWS: custom vocabularies 'tune and boost both the recognition and the formatting of specific words' and are 'most appropriate for correcting terms like brand names and acronyms.' A short list of terms is exactly the input they need. B needs a large volume of domain text to learn context. C is far more work. D is for text-to-speech, the opposite direction. Memory trick: vocabulary = a word list; language model = a reading list."
  },
  {
    "number": 429, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html",
    "question": "A team must choose one of three Amazon Bedrock foundation models for summarizing insurance claims. It has 500 of its own claims with reference summaries and wants a repeatable, side-by-side comparison with the LEAST custom tooling. What should it do?",
    "options": {
      "A": "Ask several employees which model they like best after a demo.",
      "B": "Run Amazon Bedrock model evaluation jobs on the custom prompt dataset (automatic metrics or an LLM-as-a-judge), and compare the scores.",
      "C": "Pick the model with the most parameters.",
      "D": "Fine-tune all three models first, then decide."
    },
    "correct_answer": "B",
    "explanation": "Bedrock evaluations let you 'provide your own custom prompt dataset' and score models automatically, with a judge model, or with human workers you choose. That gives a repeatable comparison on your own data. A is informal and can't be repeated. C assumes bigger means better for your task and ignores cost. D spends money before you know which base model fits. The C01 guide lists choosing foundation models in Bedrock under Task 2.1."
  },
  {
    "number": 430, "domain": 2, "task": "2.1", "concept": true,
    "question": "A manager asks the ML team to 'use ML' to route invoices: invoices over $10,000 go to a director, and everything else goes to a manager. The rule is fixed and fully known. What is the BEST recommendation?",
    "options": {
      "A": "Train an XGBoost classifier on past routing decisions.",
      "B": "Fine-tune a foundation model in Amazon Bedrock.",
      "C": "Collect a year of labeled invoices first.",
      "D": "Don't use ML. Implement the fixed rule in application logic."
    },
    "correct_answer": "D",
    "explanation": "Part of 'assessing feasibility' (Task 2.1) is recognizing when ML isn't needed. If the rule is known and deterministic, code it: it's cheaper, 100% accurate and easy to explain. ML fits when the pattern is too complex to write by hand and you have data to learn it from. A, B and C add cost and risk to approximate a rule you already have. (Standard ML concept.)"
  },
  {
    "number": 431, "domain": 2, "task": "2.2", "concept": true,
    "question": "A linear model has 500 features, and the team suspects most of them are irrelevant. They want regularization that drives the weights of useless features to EXACTLY zero, effectively selecting features. Which technique should they use?",
    "options": {
      "A": "L1 regularization (lasso)",
      "B": "L2 regularization (ridge / weight decay)",
      "C": "Dropout",
      "D": "A larger batch size"
    },
    "correct_answer": "A",
    "explanation": "L1 penalizes the absolute size of weights, which pushes many weights to exactly zero, so it doubles as feature selection. L2 (weight decay) shrinks all weights smoothly but rarely to exactly zero; use it to keep weights small and stable. Dropout randomly switches off neurons during neural network training to prevent co-dependence; it isn't for linear models. Batch size affects training dynamics, not regularization. Memory trick: L1 = 'Lose' features; L2 = 'Lower' weights. (In XGBoost: alpha = L1, lambda = L2.)"
  },
  {
    "number": 432, "domain": 2, "task": "2.2", "concept": true,
    "question": "A gradient-boosted tree model with max_depth = 2 and 20 trees has training AUC 0.71 and validation AUC 0.70. Both are low and close together. What should the team try FIRST?",
    "options": {
      "A": "Add stronger regularization (raise lambda and alpha).",
      "B": "Increase model capacity: raise max_depth and the number of trees (with early stopping on validation), and consider adding more informative features.",
      "C": "Reduce the training data.",
      "D": "Lower subsample to 0.3."
    },
    "correct_answer": "B",
    "explanation": "Low training AND validation scores that are close together mean underfitting: the model is too simple to capture the pattern. Give it more capacity (deeper trees, more rounds) and better features, and use early stopping so it doesn't swing into overfitting. A and D make the model even more conservative. C removes information. Rule: big gap between train and validation = overfit; both low = underfit. (Standard ML concept.)"
  },
  {
    "number": 433, "domain": 2, "task": "2.2", "concept": true,
    "question": "A model has 2,000 features but only 5,000 training rows. It overfits badly, and many features are noisy or highly correlated with each other. Which approach MOST directly addresses the root cause?",
    "options": {
      "A": "Add more layers.",
      "B": "Train for more epochs.",
      "C": "Increase the learning rate.",
      "D": "Feature selection: drop low-importance and redundant features (for example, based on feature importance or correlation), or reduce dimensions with PCA."
    },
    "correct_answer": "D",
    "explanation": "With many more features than the data can support, the model memorizes noise. Removing noisy and duplicate features (or compressing them with PCA) gives it fewer chances to latch onto random patterns. The C01 guide lists feature selection as a way to prevent overfitting and to shrink models. A and B add capacity or training time, which makes overfitting worse. C affects how training converges, not this cause. (Standard ML concept.)"
  },
  {
    "number": 434, "domain": 2, "task": "2.2", "concept": true,
    "question": "A single deep decision tree has very high variance: small changes in the training data produce very different trees and validation scores. Which ensemble approach targets this problem MOST directly?",
    "options": {
      "A": "Bagging, as in a random forest: train many trees on bootstrap samples and average their predictions.",
      "B": "Boosting with a very high learning rate.",
      "C": "Stacking a single model on top of itself.",
      "D": "Remove randomness by training one tree on all of the data."
    },
    "correct_answer": "A",
    "explanation": "Bagging averages many trees that each saw a different random sample, so their individual quirks cancel out, which lowers variance. It's like averaging many people's guesses of a jar's jellybean count. Boosting builds trees one after another, each fixing the previous one's errors. It mainly reduces bias (underfitting), and a very high learning rate makes it more aggressive. C isn't meaningful. D is what caused the problem. Stacking = a meta-model learns how to combine different models."
  },
  {
    "number": 435, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-fine-tune.html",
    "question": "An ML engineer fine-tunes a SageMaker JumpStart text classification model on company support tickets. How must the training data in Amazon S3 be formatted, and where does the fine-tuned model end up?",
    "options": {
      "A": "JSON Lines with prompt and completion fields. The model is registered automatically in Amazon Bedrock.",
      "B": "RecordIO-protobuf files. The model is stored in the JumpStart catalog.",
      "C": "A data.csv file whose first column is an integer class label and second column is the text. The output is model.tar.gz in the S3 output path.",
      "D": "One folder per class with .txt files. The model is deployed to a serverless endpoint automatically."
    },
    "correct_answer": "C",
    "explanation": "For JumpStart text models, AWS says the bucket must contain data.csv, 'the first column must be a unique integer for the class label', and 'the second column must be a string.' When fine-tuning finishes, the model file is written to an /output subfolder and is 'always named model.tar.gz'. D describes the format for vision models (one folder per class). A describes a different fine-tuning style, and B is the input format for algorithms such as Factorization Machines."
  },
  {
    "number": 436, "domain": 2, "task": "2.3", "concept": true,
    "question": "Model X has ROC AUC 0.50 and model Y has ROC AUC 0.88 on the same test set. The business hasn't chosen a decision threshold yet. What can the team conclude?",
    "options": {
      "A": "Model X is better, because 0.50 means balanced predictions.",
      "B": "Model Y ranks positive cases above negative cases far more reliably. Model X is no better than random guessing at ranking.",
      "C": "Model Y has 88% accuracy.",
      "D": "Nothing, because AUC can't be compared without a threshold."
    },
    "correct_answer": "B",
    "explanation": "AUC is the chance that a random positive case gets a higher score than a random negative case, measured across ALL thresholds. That's why it's useful before a threshold is chosen. 0.5 = coin flip; 1.0 = perfect ranking. C confuses AUC with accuracy, which depends on a threshold. D is backwards: being threshold-independent is AUC's strength. The ROC curve plots the true positive rate against the false positive rate as the threshold moves. (Standard ML concept.)"
  },
  {
    "number": 437, "domain": 2, "task": "2.3", "concept": true,
    "question": "Model A has AUC 0.912, trains in 1 hour, and has 40 ms p99 latency. Model B has AUC 0.916, trains in 6 hours on GPUs, and has 140 ms p99 latency. The SLA requires p99 latency under 100 ms, and retraining runs nightly. Which should the team deploy?",
    "options": {
      "A": "Model A: it meets the latency SLA at far lower cost, and the 0.004 AUC difference is unlikely to matter.",
      "B": "Model B: higher AUC always wins.",
      "C": "Model B, with a larger instance type to try to reach 100 ms.",
      "D": "Neither. Keep tuning until one model beats both on every metric."
    },
    "correct_answer": "A",
    "explanation": "Task 2.3 includes 'assessing tradeoffs between model performance, training time, and cost.' Model B breaks a hard requirement (latency) and costs much more for a tiny gain. Requirements first, then cost, then small metric differences. C might not reach the target and adds more cost. D delays delivery chasing a perfect model. (Standard ML concept.)"
  },
  {
    "number": 438, "domain": 2, "task": "2.3", "concept": true,
    "question": "A model's training accuracy is 64% and its validation accuracy is 63%. A simple baseline gets 60%. Which diagnosis and action fit BEST?",
    "options": {
      "A": "Overfitting. Add dropout.",
      "B": "Data leakage. Remove features.",
      "C": "The model is fine. Deploy it.",
      "D": "Underfitting (high bias). Add capacity or better features, reduce regularization, and train longer if the loss is still falling."
    },
    "correct_answer": "D",
    "explanation": "Training and validation scores are close together and both barely beat the baseline. The model isn't learning enough, which is underfitting. Overfitting (A) would show high training accuracy with much lower validation accuracy. Leakage (B) usually makes scores look suspiciously HIGH. C ignores that the model barely beats a trivial baseline. (Standard ML concept.)"
  }
].map(q => ({ topic: "Topic 6 - C01 Domains 1-2 Hard Set", origin: "written-c01", c01: true, hard: true, ...q })));
