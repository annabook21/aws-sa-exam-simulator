// MLA-C02 additions, part 2: one question for each official exam guide skill that the bank did not yet cover.
// Written from the official MLA-C02 exam guide task statements. The choice of setting-level topics was informed by
// the SaveMyCert MLA-C02 study guide (CC BY 4.0, github.com/savemycert/mla-c02-study-guide); no questions were copied.
EXAM_DATA.push(...[
  {
    "number": 197, "skill": "1.1.1",
    "question": "A recommendation team needs a daily copy of a 4 TB Amazon DynamoDB table in Amazon S3 for model training. The table serves a live shopping app, and the export must not consume the table's read capacity or slow down the app. Which solution meets these requirements with the LEAST operational overhead?",
    "options": {
      "A": "Run an AWS Glue job that scans the table each night and writes the results to Amazon S3.",
      "B": "Enable point-in-time recovery and use the DynamoDB export to Amazon S3 feature.",
      "C": "Write an AWS Lambda function that reads every item and writes it to Amazon S3.",
      "D": "Enable DynamoDB Streams and replay the stream into Amazon S3 from the beginning each day."
    },
    "correct_answer": "B",
    "explanation": "Getting data out of DynamoDB without touching the live table → DynamoDB export to S3. It reads from the backup (point-in-time recovery) instead of the live table, like photocopying the archive copy instead of interrupting the person using the original. Scans by Glue or Lambda use read capacity and slow the app. Streams only keep 24 hours of changes."
  },
  {
    "number": 198, "skill": "1.1.1",
    "question": "An ML engineer needs historical order data from a production Amazon Aurora MySQL database as Apache Parquet files in Amazon S3 for training. Database administrators will not allow heavy queries against the running cluster. Which solution meets these requirements?",
    "options": {
      "A": "Run a SELECT * query every hour and save the results as CSV.",
      "B": "Use AWS DMS with full load from the writer instance during business hours.",
      "C": "Create a read replica and query it with a Python script that writes JSON files.",
      "D": "Export a DB cluster snapshot to Amazon S3, which writes the table data in Apache Parquet format."
    },
    "correct_answer": "D",
    "explanation": "Snapshot export reads from a saved copy of the database, never the running one, and writes Parquet directly. That's like copying from yesterday's backup tape instead of the live system. The other options all query a running database and need extra conversion work."
  },
  {
    "number": 199, "skill": "1.1.3",
    "question": "Clickstream records are ingested through an Amazon Kinesis data stream in provisioned mode. During a marketing event, producers receive ProvisionedThroughputExceededException errors and records are dropped. Traffic is unpredictable. Which solution will fix the issue with the LEAST ongoing management?",
    "options": {
      "A": "Switch the data stream to on-demand capacity mode.",
      "B": "Increase the data retention period to 7 days.",
      "C": "Replace the stream with an Amazon SQS FIFO queue.",
      "D": "Add a second consumer application."
    },
    "correct_answer": "A",
    "explanation": "\"Throughput exceeded\" means the stream's lanes are full. On-demand mode adds lanes automatically as traffic grows, which suits unpredictable traffic. Longer retention keeps data longer but doesn't widen the road. An SQS FIFO queue has much lower throughput. More consumers read faster but don't help producers write."
  },
  {
    "number": 200, "skill": "1.1.7",
    "question": "A company already runs its product catalog on Amazon Aurora PostgreSQL and its team knows SQL well. The company wants to add semantic search over product descriptions by storing embeddings next to the existing product rows, without adding a new database service. Which solution meets these requirements?",
    "options": {
      "A": "Create an Amazon OpenSearch Serverless collection for the embeddings.",
      "B": "Store the embeddings in Amazon DynamoDB.",
      "C": "Enable the pgvector extension in Aurora PostgreSQL and store the embeddings in a vector column.",
      "D": "Store the embeddings as CSV files in Amazon S3 and scan them for each query."
    },
    "correct_answer": "C",
    "explanation": "\"Already on PostgreSQL\" and \"no new database\" → pgvector, an add-on that lets the database you already have store and search vectors. OpenSearch means a new service. DynamoDB isn't a vector store. Scanning CSV files on every query is very slow."
  },
  {
    "number": 201, "skill": "1.1.8",
    "question": "A media company is building an ML dataset of 2 million product photos and their audio descriptions. Data scientists need to filter the files by product category, date and language before training. Which storage design meets these requirements MOST cost-effectively?",
    "options": {
      "A": "Store the photos and audio in Amazon S3, and keep the category, date and language for each file in a catalog such as an AWS Glue Data Catalog table.",
      "B": "Store the photos and audio as binary columns in Amazon RDS.",
      "C": "Store all of the files on Amazon EBS volumes attached to one EC2 instance.",
      "D": "Store the files in Amazon ElastiCache for fast access."
    },
    "correct_answer": "A",
    "explanation": "Large files like images and audio belong in S3, the cheap warehouse. A separate catalog of labels (category, date, language) lets you find what you need without opening every box. Databases, EBS volumes and caches are expensive places to keep millions of large files."
  },
  {
    "number": 202, "skill": "1.2.3",
    "question": "IoT sensor records arrive through Amazon Data Firehose and are delivered to Amazon S3. Before delivery, each record must have its temperature converted from Fahrenheit to Celsius and a field renamed. Which solution meets these requirements with the LEAST operational overhead?",
    "options": {
      "A": "Deliver the raw data to S3, then run a nightly Amazon EMR cluster to transform it.",
      "B": "Enable Firehose data transformation with an AWS Lambda function that edits each record.",
      "C": "Replace Firehose with self-managed Apache Kafka on EC2.",
      "D": "Use Amazon Athena to rewrite every file after it lands."
    },
    "correct_answer": "B",
    "explanation": "Small edits to streaming records on the way in → a Firehose transformation Lambda, a worker on the conveyor belt fixing each item as it passes. A nightly EMR job or Athena rewrite means extra steps after the fact. Self-managed Kafka is far more work."
  },
  {
    "number": 203, "skill": "1.2.4",
    "question": "A health insurer's model uses customer age as a feature. Exploratory analysis shows that risk changes in steps (under 25, 25–40, 41–60, over 60) rather than smoothly, and the business wants these groups visible in the model. Which feature engineering technique fits?",
    "options": {
      "A": "Log transformation of age",
      "B": "One-hot encoding of each individual age value",
      "C": "Binning age into the four ranges",
      "D": "Removing the age feature"
    },
    "correct_answer": "C",
    "explanation": "Risk that changes in steps → binning, which sorts ages into labeled buckets, like age groups on a survey form. A log transform squashes numbers but doesn't create groups. One-hot encoding every single age creates about 80 columns. Removing age throws away a useful signal."
  },
  {
    "number": 204, "skill": "1.2.4",
    "question": "An ML engineer trains a k-nearest neighbors model on two features: annual income (values from 20,000 to 500,000) and number of children (values from 0 to 6). The model ignores the number of children almost completely. What should the engineer do?",
    "options": {
      "A": "Standardize or normalize both features so that they are on comparable scales.",
      "B": "One-hot encode the income feature.",
      "C": "Oversample customers with more children.",
      "D": "Increase the number of neighbors (k) to 100."
    },
    "correct_answer": "A",
    "explanation": "Distance-based models like k-NN measure how far apart points are. Income differences in the tens of thousands drown out child counts of 0 to 6, like comparing distances in millimeters and kilometers on one map. Scaling puts both features on the same ruler."
  },
  {
    "number": 205, "skill": "1.2.5",
    "question": "A furniture retailer wants customers to type a description such as 'mid-century walnut desk' and find matching products from a catalog of product photos. Text queries and images must be compared in the same search. Which embedding approach should the ML engineer use?",
    "options": {
      "A": "A text-only embeddings model for both the queries and the photos' file names",
      "B": "A multimodal embeddings model that places text and images in the same vector space",
      "C": "One-hot encoding of the product categories",
      "D": "Amazon Textract on each photo"
    },
    "correct_answer": "B",
    "explanation": "Searching images with words → multimodal embeddings, which put pictures and sentences on the same map so that a walnut desk photo sits next to the words \"walnut desk.\" Text-only embeddings can't look at pictures. File names are often meaningless. Textract only reads printed text."
  },
  {
    "number": 206, "skill": "1.2.6",
    "question": "A team is preparing a small dataset of medical support conversations to fine-tune a model. The dataset is too small, and many rare medical terms appear only once or twice. Which technique will help the model learn these terms with the LEAST effort?",
    "options": {
      "A": "Delete all conversations that contain rare terms.",
      "B": "Use domain-specific data augmentation, such as generating paraphrased conversations that reuse the rare terms in new contexts.",
      "C": "Convert all text to uppercase.",
      "D": "Increase the learning rate."
    },
    "correct_answer": "B",
    "explanation": "Too few examples of special vocabulary → domain-specific augmentation. Create more realistic examples, like writing extra practice sentences with each new vocabulary word. Deleting them loses the terms entirely. Uppercasing and the learning rate don't add examples."
  },
  {
    "number": 207, "skill": "1.2.7",
    "question": "A company's Amazon Bedrock knowledge base holds policy documents for 12 countries. Employees in Germany sometimes receive answers based on French policies. Each document's country is known. Which solution will return only the correct country's documents with the LEAST effort?",
    "options": {
      "A": "Create a separate knowledge base for each country.",
      "B": "Add a sentence to the prompt asking the model to ignore other countries.",
      "C": "Fine-tune the model on German policies.",
      "D": "Attach a metadata file with a country field to each document, and apply a metadata filter on country at query time."
    },
    "correct_answer": "D",
    "explanation": "Narrowing results by a known attribute → metadata filtering. Tag each document with its country, then search only the German shelf. Twelve knowledge bases is a lot to manage. Asking nicely in the prompt doesn't stop French documents from being retrieved. Fine-tuning doesn't control retrieval."
  },
  {
    "number": 208, "skill": "1.2.9",
    "question": "An ML engineer is preparing training data to fine-tune an Amazon Bedrock text model to write support replies. The data is currently in a spreadsheet with a 'customer_message' column and an 'ideal_reply' column. How should the engineer prepare the data?",
    "options": {
      "A": "Upload the spreadsheet as an .xlsx file.",
      "B": "Convert the data to unlabeled plain text and use continued pre-training.",
      "C": "Convert each row into a JSON Lines record with the customer message as the prompt and the ideal reply as the completion, and upload the file to Amazon S3.",
      "D": "Store each row as a separate document in a knowledge base."
    },
    "correct_answer": "C",
    "explanation": "Fine-tuning learns from labeled pairs: here's the question, here's the perfect answer. Bedrock expects them as JSON Lines (one prompt-and-completion pair per line) in S3. A spreadsheet isn't a supported format. Unlabeled text is for continued pre-training. A knowledge base is for RAG, not training."
  },
  {
    "number": 209, "skill": "1.3.1",
    "question": "An AWS Glue ETL job prepares training data each night. Sometimes upstream systems send files with missing customer IDs or negative prices, which corrupts the training data. The team wants the job to check these rules automatically and stop bad data before it is written. Which solution meets these requirements with the LEAST development effort?",
    "options": {
      "A": "Add AWS Glue Data Quality rules to the ETL job, and stop or route data when rules fail.",
      "B": "Have an analyst review a sample of the output files each morning.",
      "C": "Write a custom validation script that runs after the data is written.",
      "D": "Use Amazon Macie to scan the files."
    },
    "correct_answer": "A",
    "explanation": "Automatic data checks inside the job → Glue Data Quality, a quality inspector on the assembly line that rejects bad parts before they're packed. Morning reviews are manual and late. A script after writing lets bad data through first. Macie looks for sensitive data, not wrong values."
  },
  {
    "number": 210, "skill": "1.3.3",
    "question": "A dataset for a loan approval model contains 90% approved and 10% rejected applications. After a random 80/20 split, the test set happens to contain almost no rejected applications, so the evaluation results are misleading. What should the ML engineer do?",
    "options": {
      "A": "Use a 50/50 split instead.",
      "B": "Remove the rejected applications from the dataset.",
      "C": "Evaluate on the training set instead.",
      "D": "Use a stratified split so that the training and test sets keep the same 90/10 class proportions."
    },
    "correct_answer": "D",
    "explanation": "A stratified split deals cards so that every hand gets its fair share of each suit. Both sets keep the 90/10 mix, so the test results are fair. A different ratio can have the same problem. Removing rejections or testing on training data makes the evaluation meaningless."
  },
  {
    "number": 211, "skill": "1.3.6",
    "question": "A company collected 50,000 prompt-and-response pairs from its support logs to fine-tune a model. Before training, it must make sure that the pairs are well formed and that no response contains toxic or unsafe content. Which approach meets these requirements?",
    "options": {
      "A": "Fine-tune first and fix problems later with a guardrail.",
      "B": "Validate that each record has a non-empty prompt and response, remove duplicates, and screen the responses with a content safety check, such as Amazon Comprehend toxicity detection, before training.",
      "C": "Increase the number of training epochs to average out bad examples.",
      "D": "Shuffle the dataset."
    },
    "correct_answer": "B",
    "explanation": "A model learns whatever you feed it, so check the ingredients before cooking. Remove broken and duplicate pairs and screen out toxic replies first. A guardrail afterward only hides symptoms the model already learned. More epochs teaches the bad examples more strongly. Shuffling doesn't remove anything."
  },
  {
    "number": 212, "skill": "1.3.7",
    "question": "A dataset of house prices has 8% missing values in the 'lot_size' column. The column also contains a few extreme values from mansions. The ML engineer wants to fill in the missing values without letting the extreme values distort them. Which imputation method is MOST appropriate?",
    "options": {
      "A": "Fill the missing values with the column's mean.",
      "B": "Fill the missing values with zero.",
      "C": "Fill the missing values with the column's median.",
      "D": "Delete the 'lot_size' column."
    },
    "correct_answer": "C",
    "explanation": "With extreme outliers, use the median. If a billionaire walks into a café, the average income in the room skyrockets but the middle person's income doesn't change. The mean gets pulled up by mansions. Zero is a false value. Deleting the column wastes useful data."
  },
  {
    "number": 213, "skill": "2.1.1",
    "question": "A company must summarize 300-page contracts in a single request on Amazon Bedrock. The contracts are in English and Japanese. Before comparing models on price and quality, what should the ML engineer check FIRST to shortlist candidate models?",
    "options": {
      "A": "Which model has the lowest price per token",
      "B": "Which model is newest",
      "C": "Which model supports image generation",
      "D": "Which models have a context window large enough for a 300-page contract and support both English and Japanese"
    },
    "correct_answer": "D",
    "explanation": "Start with the hard requirements: can the model fit the whole document and does it speak both languages? A cheap model that can't read the whole contract is useless. Price and quality comparisons come after the must-haves. Image generation isn't needed."
  },
  {
    "number": 214, "skill": "2.1.3",
    "question": "A bank's credit model must be approved by regulators, who require a clear explanation of how each input affects every decision. A deep neural network is 1% more accurate than simpler models but cannot be explained easily. Which model should the ML engineer choose?",
    "options": {
      "A": "An interpretable model, such as logistic regression or a shallow decision tree",
      "B": "The deep neural network",
      "C": "A large language model",
      "D": "K-means clustering"
    },
    "correct_answer": "A",
    "explanation": "When explanation is required, a slightly less accurate model you can explain beats a black box. Logistic regression and shallow trees show exactly how each input moves the result, like a recipe with listed amounts. LLMs are also black boxes. K-means doesn't predict approvals."
  },
  {
    "number": 215, "skill": "2.1.6",
    "question": "A team trains a large model for 30 hours each week on SageMaker AI. Training can be paused and resumed. The team wants to reduce training cost as much as possible. Which solution meets these requirements?",
    "options": {
      "A": "Use larger On-Demand instances to finish faster.",
      "B": "Use Dedicated Instances.",
      "C": "Use SageMaker AI managed Spot Training with checkpoints saved to Amazon S3 so that interrupted jobs resume where they stopped.",
      "D": "Run training on a SageMaker notebook instance."
    },
    "correct_answer": "C",
    "explanation": "\"Can be paused and resumed\" → Spot, spare capacity at a large discount that can be taken back. Checkpoints are bookmarks, so an interrupted job continues from the last page instead of starting over. Bigger instances and Dedicated Instances cost more. Notebooks aren't built for long training runs."
  },
  {
    "number": 216, "skill": "2.2.4",
    "question": "An ML engineer is training a model that is too large to fit in the memory of a single GPU, even with a batch size of 1. Which training approach will allow the job to run?",
    "options": {
      "A": "Data parallelism, which copies the full model to every GPU",
      "B": "Model parallelism, which splits the model's layers across multiple GPUs",
      "C": "Increasing the number of epochs",
      "D": "Early stopping"
    },
    "correct_answer": "B",
    "explanation": "Model too big for one GPU → model parallelism, which splits the model across several GPUs like dividing a huge jigsaw puzzle across several tables. Data parallelism copies the whole model to each GPU, so it still doesn't fit. Epochs and early stopping don't change memory needs."
  },
  {
    "number": 217, "skill": "2.2.5",
    "question": "A model scores poorly on both the training data and the validation data, and both scores are similar. What is the MOST likely problem, and what should the ML engineer try?",
    "options": {
      "A": "Overfitting; add dropout",
      "B": "Concept drift; retrain on newer data",
      "C": "Data leakage; remove features",
      "D": "Underfitting; use a more complex model or add more informative features"
    },
    "correct_answer": "D",
    "explanation": "Bad on everything, including practice, means underfitting: the student didn't learn the material at all. Give the model more capacity or better features. Overfitting is good on training and bad on new data. Drift is when something used to work and the world changed."
  },
  {
    "number": 218, "skill": "2.2.6",
    "question": "An ML engineer has three trained models: XGBoost, a random forest and a neural network. Each makes different kinds of mistakes, and none meets the accuracy target alone. Which approach is MOST likely to improve accuracy?",
    "options": {
      "A": "Combine the models in an ensemble, such as by averaging or voting on their predictions.",
      "B": "Use only the newest model.",
      "C": "Retrain each model with fewer features.",
      "D": "Lower the learning rate of the random forest."
    },
    "correct_answer": "A",
    "explanation": "Models that make different mistakes → an ensemble. Ask three experts and go with the majority, and individual errors tend to cancel out. Picking one model keeps its blind spots. Random forests don't have a learning rate."
  },
  {
    "number": 219, "skill": "2.2.7",
    "question": "A GPU training job fails immediately with a CUDA out-of-memory error. The model fits on the GPU, but the job was configured with a very large batch size. Which change should the ML engineer make FIRST?",
    "options": {
      "A": "Increase the number of epochs.",
      "B": "Increase the learning rate.",
      "C": "Reduce the batch size.",
      "D": "Switch to a CPU instance."
    },
    "correct_answer": "C",
    "explanation": "Batch size is how many examples the GPU holds at once, like how many plates you carry in one trip. Too many and you drop them, which is the out-of-memory error. Carry fewer per trip. Epochs and the learning rate don't change memory use. A CPU would be far slower."
  },
  {
    "number": 220, "skill": "2.2.9",
    "question": "A RAG assistant for an electronics store answers concept questions well, but it fails when users type exact part numbers such as 'XR-4471-B'. The semantic search returns similar-sounding but wrong parts. Which change will improve retrieval for exact part numbers?",
    "options": {
      "A": "Use hybrid search, which combines semantic search with keyword matching.",
      "B": "Increase the temperature of the generation model.",
      "C": "Use larger chunks.",
      "D": "Switch to a smaller embeddings model."
    },
    "correct_answer": "A",
    "explanation": "Semantic search matches meaning, but part numbers have no meaning, so they need exact matching. Hybrid search does both: it understands \"cheap wireless mouse\" and also finds XR-4471-B exactly. Temperature, chunk size and model size don't add exact matching."
  },
  {
    "number": 221, "skill": "2.3.7",
    "question": "A model extracts amounts from scanned invoices. Most extractions are correct, but low-confidence extractions must be reviewed by a person before payment. The company wants this review loop with the LEAST development effort. Which solution meets these requirements?",
    "options": {
      "A": "Send every invoice to a human reviewer.",
      "B": "Use Amazon Augmented AI (Amazon A2I) to send only predictions below a confidence threshold to human reviewers.",
      "C": "Retrain the model every day.",
      "D": "Use Amazon Lex to ask customers to confirm amounts."
    },
    "correct_answer": "B",
    "explanation": "People review only the uncertain cases → Amazon A2I (Augmented AI). It's like a cashier calling a manager only for unusual transactions. Reviewing everything wastes time. Retraining doesn't add human checks. Lex builds chatbots."
  },
  {
    "number": 222, "skill": "2.3.10",
    "question": "Users say a RAG assistant's answers are sometimes off-topic. The team suspects that the knowledge base retrieves irrelevant chunks, but it isn't sure whether the problem is retrieval or generation. Which approach will isolate the problem with the LEAST effort?",
    "options": {
      "A": "Switch to a larger generation model.",
      "B": "Run an Amazon Bedrock knowledge base evaluation in retrieve-only mode to measure the relevance of retrieved context.",
      "C": "Lower the temperature.",
      "D": "Rebuild the vector index."
    },
    "correct_answer": "B",
    "explanation": "Check the search step on its own. A retrieve-only evaluation grades whether the right pages were pulled, before the model writes anything, like checking whether the librarian brought the right books before blaming the writer. Changing models, temperature or the index is guessing."
  },
  {
    "number": 223, "skill": "3.1.1",
    "question": "A company serves a high-volume text classification model on GPU instances and wants to lower its inference cost per prediction substantially. Its framework is supported by the AWS Neuron SDK. Which compute choice is MOST cost-effective?",
    "options": {
      "A": "Larger GPU instances",
      "B": "Memory optimized instances",
      "C": "Dedicated Hosts",
      "D": "AWS Inferentia-based instances (for example, Inf2)"
    },
    "correct_answer": "D",
    "explanation": "AWS Inferentia chips are built only for running predictions, like a specialized espresso machine instead of a full kitchen, so the cost per prediction is lower. Bigger GPUs cost more. Memory optimized instances and Dedicated Hosts don't target inference cost."
  },
  {
    "number": 224, "skill": "3.1.4",
    "question": "A company wants to use a foundation model through a simple API. It doesn't want to choose instances, manage scaling or patch servers, and it pays per request. Which deployment option fits BEST?",
    "options": {
      "A": "Amazon Bedrock on-demand inference",
      "B": "A SageMaker AI real-time endpoint on GPU instances",
      "C": "Amazon EC2 instances with the model installed",
      "D": "Amazon EKS with GPU nodes"
    },
    "correct_answer": "A",
    "explanation": "No instances, no scaling and pay per request → Bedrock, like ordering takeout instead of running your own kitchen. SageMaker endpoints, EC2 and EKS all mean picking and managing machines. Choose SageMaker when you need full control over the model or its container."
  },
  {
    "number": 225, "skill": "3.1.6",
    "question": "A company has a dozen internal REST APIs and AWS Lambda functions. It wants AI agents built with different frameworks to discover and call these tools in a standard way, without rewriting each tool. Which solution meets these requirements?",
    "options": {
      "A": "Copy each API's documentation into every agent's prompt.",
      "B": "Use Amazon Bedrock AgentCore Gateway to expose the APIs and Lambda functions as Model Context Protocol (MCP) tools.",
      "C": "Fine-tune each agent's model on the API responses.",
      "D": "Put the APIs behind Amazon CloudFront."
    },
    "correct_answer": "B",
    "explanation": "MCP is a universal plug that lets any agent use any tool. AgentCore Gateway wraps your existing APIs and Lambda functions so that they all fit that plug. Pasting documentation into prompts doesn't let agents call anything. Fine-tuning and CloudFront don't make tools discoverable."
  },
  {
    "number": 226, "skill": "3.2.6",
    "question": "A SageMaker AI real-time endpoint must add instances when traffic rises. The model's latency grows as each instance receives more requests per minute. Which metric should the ML engineer use for a target tracking scaling policy?",
    "options": {
      "A": "The endpoint's disk usage",
      "B": "The number of model versions in Model Registry",
      "C": "SageMakerVariantInvocationsPerInstance",
      "D": "The size of the training dataset"
    },
    "correct_answer": "C",
    "explanation": "Requests per instance is how busy each server is, like customers per cashier. When it rises above the target, open another register. It's the standard metric for scaling endpoints. Disk usage, model versions and dataset size don't track live load."
  },
  {
    "number": 227, "skill": "3.2.9",
    "question": "A customer service agent on Amazon Bedrock AgentCore forgets earlier parts of a conversation, and it doesn't remember a customer's preferences between sessions. Which solution meets these requirements with the LEAST custom code?",
    "options": {
      "A": "Store every message in a DynamoDB table and write custom retrieval logic.",
      "B": "Increase the model's max_tokens.",
      "C": "Fine-tune the model on past conversations each night.",
      "D": "Use Amazon Bedrock AgentCore Memory for short-term conversation memory and long-term memory across sessions."
    },
    "correct_answer": "D",
    "explanation": "An agent that remembers → AgentCore Memory. Short-term memory is what was said a minute ago. Long-term memory is the customer's usual order, kept between visits. DynamoDB works but is custom code. max_tokens only limits answer length. Nightly fine-tuning is slow and expensive."
  },
  {
    "number": 228, "skill": "3.2.11",
    "question": "A team built an AI agent with an open-source agent framework. It wants to run the agent in production on AWS with automatic scaling, isolated user sessions and no servers to manage. Which service meets these requirements?",
    "options": {
      "A": "Amazon Bedrock AgentCore Runtime",
      "B": "A single Amazon EC2 instance",
      "C": "Amazon SageMaker batch transform",
      "D": "AWS Glue"
    },
    "correct_answer": "A",
    "explanation": "Hosting an agent built with any framework, serverless, with each user's session kept separate → AgentCore Runtime, like a managed hotel for agents where each guest gets a private room. A single EC2 instance doesn't scale or isolate sessions. Batch transform and Glue aren't for running agents."
  },
  {
    "number": 229, "skill": "3.3.1",
    "question": "A team deploys a new model to a SageMaker AI endpoint. It wants a small slice of traffic to go to the new model first, and automatic rollback if error rates rise. Which deployment configuration meets these requirements?",
    "options": {
      "A": "Blue/green deployment with all-at-once traffic shifting and no alarms",
      "B": "Delete the old endpoint and create a new one.",
      "C": "Blue/green deployment with canary traffic shifting and Amazon CloudWatch alarms for automatic rollback",
      "D": "Shadow testing"
    },
    "correct_answer": "C",
    "explanation": "Canary means a small test group goes first, like the canary miners carried into a mine. If CloudWatch alarms fire, traffic automatically rolls back to the old model. All-at-once sends everyone over at once. Deleting the endpoint causes downtime. Shadow testing never sends real answers to users."
  },
  {
    "number": 230, "skill": "3.3.1",
    "question": "A company wants to shift traffic to a new model version gradually, in equal steps of 20% every 10 minutes, with automatic rollback if alarms fire. Which SageMaker AI deployment guardrail option fits?",
    "options": {
      "A": "Canary traffic shifting",
      "B": "All-at-once traffic shifting",
      "C": "Rolling deployment with a batch size of all instances",
      "D": "Linear traffic shifting"
    },
    "correct_answer": "D",
    "explanation": "Equal steps over time → linear, like walking up a staircase. Canary is one small test step and then everything. All-at-once moves everyone together. A rolling deployment with every instance in one batch is also all at once."
  },
  {
    "number": 231, "skill": "3.3.3",
    "question": "A SageMaker AI training job reads 5 TB of image files from Amazon S3 in the default File input mode and waits almost an hour for the download before training starts. The training script opens files by using normal file paths and must not be modified. Which change will remove the delay with the LEAST effort?",
    "options": {
      "A": "Switch the input mode to Pipe.",
      "B": "Switch the input mode to FastFile.",
      "C": "Increase the size of the instance's storage volume.",
      "D": "Copy the data to Amazon EFS."
    },
    "correct_answer": "B",
    "explanation": "File mode downloads everything before starting, like downloading a whole movie before pressing play. FastFile streams the files as they're needed while still looking like normal files to the script, like streaming a movie. Pipe mode also streams, but the script must change to read from a pipe. A bigger disk still waits for the full download. EFS means setting up new storage."
  },
  {
    "number": 232, "skill": "3.3.3",
    "question": "A distributed training job runs on 10 instances. Each instance should train on a different tenth of the dataset in Amazon S3, but currently every instance downloads the entire dataset. Which channel setting should the ML engineer change?",
    "options": {
      "A": "Set the S3 data distribution type to ShardedByS3Key.",
      "B": "Set the S3 data distribution type to FullyReplicated.",
      "C": "Set the input mode to Pipe.",
      "D": "Enable network isolation."
    },
    "correct_answer": "A",
    "explanation": "ShardedByS3Key deals out the files so that each worker gets its own pile, like dividing a deck of cards among players. FullyReplicated, the default, gives every worker the full deck. Pipe mode changes how data arrives, not who gets which part. Network isolation is a security setting."
  },
  {
    "number": 233, "skill": "3.3.8",
    "question": "A team updates its Amazon Bedrock agent often. The production application must keep using a stable, tested agent version, and the team must be able to switch production to a new version, or back, without changing application code. Which solution meets these requirements?",
    "options": {
      "A": "Have the application always call the working draft of the agent.",
      "B": "Create a new agent for every change and update the application code each time.",
      "C": "Copy the agent's configuration into a spreadsheet.",
      "D": "Create agent versions, and have the application call an alias that points to the approved version."
    },
    "correct_answer": "D",
    "explanation": "An alias is a nickname, like \"production,\" that you can point at any saved version. The app always calls \"production,\" and you move the nickname to a new version or back with no code changes. Calling the draft means untested changes reach users. New agents for every change require code updates."
  },
  {
    "number": 234, "skill": "3.3.11",
    "question": "New documents are added to an S3 bucket that feeds an Amazon Bedrock knowledge base several times each day. Answers must include new documents within an hour, with no manual steps. Which solution meets these requirements?",
    "options": {
      "A": "Have an employee choose Sync in the console each morning.",
      "B": "Rebuild the vector index from scratch every week.",
      "C": "Use an Amazon EventBridge schedule (or an S3 event) that invokes a Lambda function to start a knowledge base ingestion job.",
      "D": "Fine-tune the model whenever documents change."
    },
    "correct_answer": "C",
    "explanation": "Automatic refresh → EventBridge (the alarm clock) triggers a Lambda function that starts an ingestion job (the sync). New documents become searchable without anyone clicking. Morning syncs and weekly rebuilds are too slow. Fine-tuning doesn't update retrieval."
  },
  {
    "number": 235, "skill": "4.1.1",
    "question": "An operations team wants a ready-made dashboard that shows invocation counts, latency, token usage and errors for the company's Amazon Bedrock model calls, without building custom dashboards. Which solution meets these requirements?",
    "options": {
      "A": "Use Amazon CloudWatch generative AI observability.",
      "B": "Use AWS Config.",
      "C": "Use SageMaker Model Monitor.",
      "D": "Use VPC Flow Logs."
    },
    "correct_answer": "A",
    "explanation": "A prebuilt dashboard for generative AI calls → CloudWatch generative AI observability, a car dashboard built specifically for your models. AWS Config tracks configuration changes. Model Monitor watches SageMaker endpoints for data drift. Flow Logs only show network traffic."
  },
  {
    "number": 236, "skill": "4.2.1",
    "question": "A team is unsure which instance type to use for a new SageMaker AI endpoint. It needs the lowest-cost instance that still meets a 100 ms latency target at its expected traffic. Which solution provides this evidence with the LEAST effort?",
    "options": {
      "A": "Guess, then adjust after a month of production traffic.",
      "B": "Always choose the largest available GPU instance.",
      "C": "Read the instance pricing page.",
      "D": "Run a SageMaker Inference Recommender load test job."
    },
    "correct_answer": "D",
    "explanation": "Inference Recommender test-drives your model on several instance types and reports latency and cost for each, like test-driving several cars before you buy. Guessing and always choosing the biggest waste money. A pricing page shows cost but not how fast your model runs."
  },
  {
    "number": 237, "skill": "4.2.9",
    "question": "A company's Amazon Bedrock bill is growing quickly. Analysis shows that prompts include long, repeated instructions, and responses are often much longer than users need. Which combination of actions will reduce cost? (Choose two.)",
    "options": {
      "A": "Shorten and reuse prompt instructions, using prompt caching for the repeated parts.",
      "B": "Increase the temperature.",
      "C": "Set a lower max_tokens limit for responses.",
      "D": "Switch to a larger model.",
      "E": "Disable model invocation logging."
    },
    "correct_answer": "AC",
    "explanation": "Foundation models charge per token, like paying per word for a telegram. Send fewer words (shorter prompts and caching of repeated parts) and accept fewer back (a lower max_tokens). Temperature doesn't change cost. A larger model usually costs more per token. Logging isn't the main cost."
  },
  {
    "number": 238, "skill": "4.2.10",
    "question": "A knowledge base contains 5 million documents. Each day, about 1,000 documents change. The team currently deletes and re-embeds the entire collection every night, and embedding costs are high. Which change will reduce cost the MOST?",
    "options": {
      "A": "Switch to a larger embeddings model.",
      "B": "Increase the chunk overlap.",
      "C": "Use the knowledge base's incremental sync so that only new, changed or deleted documents are processed.",
      "D": "Run the full re-embedding twice each day."
    },
    "correct_answer": "C",
    "explanation": "Re-embedding 5 million documents to update 1,000 is like reprinting the whole encyclopedia to fix one page. An incremental sync updates only the pages that changed. A larger model, more overlap or more frequent rebuilds all cost more."
  },
  {
    "number": 239, "skill": "3.2.4",
    "question": "A SageMaker AI endpoint and the application that calls it both run in private subnets with no internet access. The application's calls to InvokeEndpoint time out. What should the ML engineer do?",
    "options": {
      "A": "Create an interface VPC endpoint for the SageMaker AI Runtime service.",
      "B": "Create an S3 gateway endpoint.",
      "C": "Attach an internet gateway to the private subnets.",
      "D": "Increase the endpoint's instance count."
    },
    "correct_answer": "A",
    "explanation": "Private apps reach AWS services through private hallways. The prediction call goes to the SageMaker AI Runtime service, so it needs its own interface endpoint. An S3 gateway endpoint only reaches S3. An internet gateway breaks the \"no internet\" design. More instances don't fix a network path."
  },
  {
    "number": 240, "skill": "3.3.2",
    "question": "An MLOps team stores model code in GitHub. It wants AWS CodePipeline to start automatically whenever code is pushed to the main branch, without storing personal access tokens in the pipeline. Which solution meets these requirements?",
    "options": {
      "A": "Poll GitHub from a cron job on EC2.",
      "B": "Email the team to start the pipeline manually.",
      "C": "Create an AWS CodeConnections connection to GitHub and use it as the pipeline's source.",
      "D": "Copy the repository to Amazon S3 every hour."
    },
    "correct_answer": "C",
    "explanation": "CodeConnections is the official, managed link between AWS and GitHub, like a secure doorbell that rings CodePipeline on every push without you storing a password. Polling, manual starts and hourly copies are slow, manual or insecure."
  },
  {
    "number": 241, "skill": "4.3.4",
    "question": "A compliance team must be alerted automatically if anyone creates a SageMaker AI endpoint configuration that does not use an AWS KMS key for encryption. Which solution meets this requirement with the LEAST effort?",
    "options": {
      "A": "Review the SageMaker AI console each week.",
      "B": "Enable the AWS Config managed rule that checks SageMaker AI endpoint configurations for a KMS key, and send noncompliant results to Amazon SNS.",
      "C": "Use SageMaker Debugger.",
      "D": "Search AWS CloudTrail logs manually each month."
    },
    "correct_answer": "B",
    "explanation": "Automatically checking that resources follow a rule → AWS Config, a building inspector who checks every new room against the code and reports violations. Weekly or monthly manual reviews are slow. Debugger watches training jobs."
  },
  {
    "number": 242, "skill": "4.3.7",
    "question": "A company retrains a fraud model weekly on data from several partner feeds. The security team worries that an attacker could insert fake records to teach the model to approve fraud (data poisoning). Which measures reduce this risk? (Choose two.)",
    "options": {
      "A": "Restrict write access to the training data bucket with IAM and bucket policies, and turn on S3 versioning.",
      "B": "Increase the number of training epochs.",
      "C": "Validate incoming partner data against expected schemas and value ranges, and alert on unusual distribution changes before training.",
      "D": "Make the training bucket public so that partners can upload easily.",
      "E": "Lower the model's learning rate."
    },
    "correct_answer": "AC",
    "explanation": "Data poisoning is someone slipping bad ingredients into the pantry. Lock the pantry (restrict who can write, and keep versions so you can roll back), and inspect deliveries (validate data and flag odd changes). Epochs and the learning rate don't stop bad data. A public bucket invites the attack."
  },
  {
    "number": 243, "skill": "1.3.4",
    "question": "A company is training an image model to screen job applicants' profile photos for a professional appearance score. Before training, it must check whether the training images under-represent certain demographic groups. Which solution provides these bias metrics with the LEAST custom code?",
    "options": {
      "A": "Count the images by hand.",
      "B": "Use SageMaker Debugger.",
      "C": "Use SageMaker Clarify to compute pre-training bias metrics on the dataset and its demographic labels.",
      "D": "Use Amazon Rekognition to generate image labels and stop there."
    },
    "correct_answer": "C",
    "explanation": "Checking a dataset for unfair representation before training → Clarify pre-training bias metrics, the fairness inspector checking the ingredients before cooking. Counting by hand doesn't scale. Debugger watches training. Rekognition labels images but doesn't measure bias."
  },
  {
    "number": 244, "skill": "1.1.5",
    "question": "Analysts query a 2 TB training dataset in Amazon S3 with Amazon Athena, usually selecting only 3 of its 120 columns. The data is stored as CSV, and queries are slow and expensive. Which change will improve performance and reduce cost the MOST?",
    "options": {
      "A": "Compress the CSV files with gzip.",
      "B": "Convert the data to JSON Lines.",
      "C": "Split the CSV into more, smaller files.",
      "D": "Convert the data to a columnar format such as Apache Parquet or ORC."
    },
    "correct_answer": "D",
    "explanation": "Columnar formats store each column separately, like a filing cabinet with one drawer per column. A query for 3 columns opens only 3 drawers instead of reading all 120. Athena charges by data scanned, so cost drops too. Compression and smaller files still read every column. JSON Lines is row-based as well."
  }
].map(q => ({ topic: "Topic 3 - C02 Guide Coverage", origin: "written", ...q })));
