// MLA-C02 additions, part 2: one question for each official exam guide skill that the bank did not yet cover,
// plus Well-Architected ML and Generative AI Lens best practices. Facts checked against AWS documentation.
// Topic selection for setting-level questions was informed by the SaveMyCert MLA-C02 study guide (CC BY 4.0); no questions were copied.
EXAM_DATA.push(...[
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 197, "source": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataExport.HowItWorks.html",
    "skill": "1.1.1",
    "question": "A recommendation team needs a daily copy of a 4 TB Amazon DynamoDB table in Amazon S3 for model training. The table serves a live shopping app, and the export must not consume the table's read capacity or slow down the app. Which solution meets these requirements with the LEAST operational overhead?",
    "options": {
      "A": "Run an AWS Glue job each night that reads the table through the DynamoDB connector and writes to Amazon S3.",
      "B": "Enable point-in-time recovery and use the DynamoDB export to Amazon S3 feature.",
      "C": "Enable DynamoDB Streams and use a Lambda function to write each change to Amazon S3.",
      "D": "Create an on-demand backup each night and restore it to a new table for the export job to scan."
    },
    "correct_answer": "B",
    "explanation": "Getting data out of DynamoDB without touching the live table → export to S3, which reads from point-in-time recovery data and uses no read capacity. A Glue scan uses the table's read capacity and slows the app. Streams capture only changes, not a full daily copy. Restoring a backup to a new table works, but it's slow and has many moving parts."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 198,
    "skill": "1.1.1",
    "question": "An ML engineer needs historical order data from a production Amazon Aurora MySQL database as Apache Parquet files in Amazon S3 for training. Database administrators will not allow heavy queries against the running cluster. Which solution meets these requirements?",
    "options": {
      "A": "Create an Aurora read replica and run nightly SELECT queries against it with AWS Glue, writing Parquet.",
      "B": "Use AWS DMS with a full-load task from the cluster to Amazon S3 in Parquet format.",
      "C": "Use Amazon Athena federated query to read the cluster and write the results to Amazon S3.",
      "D": "Export a DB cluster snapshot to Amazon S3, which writes the table data in Apache Parquet format."
    },
    "correct_answer": "D",
    "explanation": "Snapshot export reads a saved copy, never the running cluster, and writes Parquet directly. A read replica avoids the writer but adds an instance and a Glue job. DMS full load and Athena federated queries both read from the live database, which the administrators have forbidden."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 199, "source": "https://docs.aws.amazon.com/streams/latest/dev/how-do-i-size-a-stream.html",
    "skill": "1.1.3",
    "question": "Clickstream records are ingested through an Amazon Kinesis data stream in provisioned mode. During a marketing event, producers receive ProvisionedThroughputExceededException errors and records are dropped. Traffic is unpredictable. Which solution will fix the issue with the LEAST ongoing management?",
    "options": {
      "A": "Switch the data stream to on-demand capacity mode.",
      "B": "Manually split shards before each planned marketing event.",
      "C": "Enable enhanced fan-out for the consumers.",
      "D": "Increase the data retention period to 7 days."
    },
    "correct_answer": "A",
    "explanation": "Producers hitting \"throughput exceeded\" → not enough write capacity. On-demand mode adds capacity automatically, which suits unpredictable traffic. Splitting shards by hand works only for events you know about in advance and needs ongoing work. Enhanced fan-out speeds up readers, not writers. Retention controls how long data is kept, not how fast it can be written."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 200,
    "skill": "1.1.7",
    "question": "A company already runs its product catalog on Amazon Aurora PostgreSQL and its team knows SQL well. The company wants to add semantic search over product descriptions by storing embeddings next to the existing product rows, without adding a new database service. Which solution meets these requirements?",
    "options": {
      "A": "Create an Amazon OpenSearch Serverless vector collection and sync the embeddings from Aurora.",
      "B": "Use Amazon Kendra to index the product descriptions.",
      "C": "Enable the pgvector extension in Aurora PostgreSQL and store the embeddings in a vector column.",
      "D": "Store the embeddings in Amazon S3 Vectors and join the results to Aurora in the application."
    },
    "correct_answer": "C",
    "explanation": "\"Already on PostgreSQL\" + \"no new database service\" → pgvector, an extension that adds vector search to the database you already run. OpenSearch Serverless, Kendra and S3 Vectors all work for semantic search, but each one is a new service to add and keep in sync."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 201,
    "skill": "1.1.8",
    "question": "A media company is building an ML dataset of 2 million product photos and their audio descriptions. Data scientists need to filter the files by product category, date and language before training. Which storage design meets these requirements MOST cost-effectively?",
    "options": {
      "A": "Store the photos and audio in Amazon S3, and keep the category, date and language for each file in a catalog such as an AWS Glue Data Catalog table.",
      "B": "Store the photos and audio in Amazon S3, and encode category, date and language only in the S3 object key names.",
      "C": "Store the files on an Amazon EFS file system organized into folders by category.",
      "D": "Store the files in Amazon S3 Glacier Flexible Retrieval with tags for category, date and language."
    },
    "correct_answer": "A",
    "explanation": "Large media belongs in cheap S3 storage, and a searchable catalog of attributes lets you filter without opening every file. Key names alone make filtering by several attributes awkward. EFS costs more per GB for data used in batches. Glacier needs a retrieval wait before every training run."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 202,
    "skill": "1.2.3",
    "question": "IoT sensor records arrive through Amazon Data Firehose and are delivered to Amazon S3. Before delivery, each record must have its temperature converted from Fahrenheit to Celsius and a field renamed. Which solution meets these requirements with the LEAST operational overhead?",
    "options": {
      "A": "Send the stream to Amazon Managed Service for Apache Flink to transform the records, then deliver them to Firehose.",
      "B": "Enable Firehose data transformation with an AWS Lambda function that edits each record.",
      "C": "Deliver the raw data to S3, then run a scheduled AWS Glue ETL job that rewrites the files.",
      "D": "Enable Firehose record format conversion to Apache Parquet."
    },
    "correct_answer": "B",
    "explanation": "Small edits to each streaming record on the way in → a Firehose transformation Lambda, a worker on the conveyor belt fixing each item. Flink works, but it's a whole stream-processing application for a simple field edit. A Glue job afterward means raw data lands first. Format conversion changes the file format, not the values."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 203, "concept": true,
    "skill": "1.2.4",
    "question": "A health insurer's model uses customer age as a feature. Exploratory analysis shows that risk changes in steps (under 25, 25–40, 41–60, over 60) rather than smoothly, and the business wants these groups visible in the model. Which feature engineering technique fits?",
    "options": {
      "A": "Log transformation of age",
      "B": "Standardization of age to zero mean and unit variance",
      "C": "Binning age into the four ranges",
      "D": "Polynomial features of age (age squared and age cubed)"
    },
    "correct_answer": "C",
    "explanation": "Risk that changes in steps, with groups the business wants to see → binning into labeled buckets. A log transform and standardization only rescale the numbers. Polynomial features make smooth curves, not steps, and they're hard for the business to read."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 204, "concept": true,
    "skill": "1.2.4",
    "question": "An ML engineer trains a k-nearest neighbors model on two features: annual income (values from 20,000 to 500,000) and number of children (values from 0 to 6). The model ignores the number of children almost completely. What should the engineer do?",
    "options": {
      "A": "Standardize or normalize both features so that they are on comparable scales.",
      "B": "Apply a log transformation to the number of children only.",
      "C": "Apply binning to income only.",
      "D": "Increase k so that more neighbors vote."
    },
    "correct_answer": "A",
    "explanation": "Distance-based models like k-NN measure how far apart points are. Income differences in the tens of thousands drown out child counts of 0 to 6, so put both on the same ruler with scaling. Log-transforming the small feature or binning only income doesn't make the scales comparable. A larger k doesn't fix how distance is measured."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 205,
    "skill": "1.2.5",
    "question": "A furniture retailer wants customers to type a description such as 'mid-century walnut desk' and find matching products from a catalog of product photos. Text queries and images must be compared in the same search. Which embedding approach should the ML engineer use?",
    "options": {
      "A": "A text embeddings model for the queries, and image captions generated by a separate model and embedded as text",
      "B": "A multimodal embeddings model that places text and images in the same vector space",
      "C": "Amazon Rekognition labels for each photo, matched against keywords in the query",
      "D": "A text embeddings model applied to each product's title and description only"
    },
    "correct_answer": "B",
    "explanation": "Searching images with words → multimodal embeddings, which put pictures and sentences on the same map. Generated captions work in a pinch, but they lose visual detail and add a second model. Rekognition labels are broad keywords like \"desk\" and miss style. Title-only search ignores what the photo shows."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 206,
    "skill": "1.2.6",
    "question": "A team is preparing a small dataset of medical support conversations to fine-tune a model. The dataset is too small, and many rare medical terms appear only once or twice. Which technique will help the model learn these terms with the LEAST effort?",
    "options": {
      "A": "Increase the number of fine-tuning epochs so the rare terms are seen more often.",
      "B": "Use domain-specific data augmentation, such as generating paraphrased conversations that reuse the rare terms in new contexts.",
      "C": "Use continued pre-training on the same small dataset.",
      "D": "Add the rare terms and their definitions to the system prompt at inference time."
    },
    "correct_answer": "B",
    "explanation": "Too few examples of specialized vocabulary → domain-specific augmentation creates more realistic examples using those terms. More epochs on the same few examples tends to overfit. Continued pre-training needs a large amount of unlabeled text, not a small set. Prompt definitions help a little, but the question asks how to prepare the training data."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 207,
    "skill": "1.2.7",
    "question": "A company's Amazon Bedrock knowledge base holds policy documents for 12 countries. Employees in Germany sometimes receive answers based on French policies. Each document's country is known. Which solution will return only the correct country's documents with the LEAST effort?",
    "options": {
      "A": "Create a separate knowledge base for each country and route queries in the application.",
      "B": "Add the country name to every query so that semantic search favors that country.",
      "C": "Enable a reranker so that German documents rank higher for German users.",
      "D": "Attach a metadata file with a country field to each document, and apply a metadata filter on country at query time."
    },
    "correct_answer": "D",
    "explanation": "Limiting results by a known attribute → metadata filtering: tag each document's country, then search only the German shelf. Twelve knowledge bases is far more to manage. Adding the country to the query only nudges results, so French documents can still appear. A reranker reorders results but doesn't exclude other countries."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 208,
    "skill": "1.2.9",
    "question": "An ML engineer is preparing training data to fine-tune an Amazon Bedrock text model to write support replies. The data is currently in a spreadsheet with a 'customer_message' column and an 'ideal_reply' column. How should the engineer prepare the data?",
    "options": {
      "A": "Upload the spreadsheet as CSV and point the customization job at it.",
      "B": "Concatenate the messages and replies into plain text, and use continued pre-training.",
      "C": "Convert each row into a JSON Lines record with the customer message as the prompt and the ideal reply as the completion, and upload the file to Amazon S3.",
      "D": "Create a Bedrock knowledge base from the spreadsheet and use RAG."
    },
    "correct_answer": "C",
    "explanation": "Fine-tuning learns from labeled pairs, and Bedrock expects them as JSON Lines in S3 (one prompt-and-completion record per line). CSV isn't the expected format. Plain text for continued pre-training loses which part is the question and which is the answer. A knowledge base is for retrieval, not training."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 209, "source": "https://docs.aws.amazon.com/glue/latest/dg/data-quality-gs-studio-notebooks.html",
    "skill": "1.3.1",
    "question": "An AWS Glue ETL job prepares training data each night. Sometimes upstream systems send files with missing customer IDs or negative prices, which corrupts the training data. The team wants the job to check these rules automatically and stop bad data before it is written. Which solution meets these requirements with the LEAST development effort?",
    "options": {
      "A": "Add AWS Glue Data Quality rules to the ETL job, and stop or route data when rules fail.",
      "B": "Run AWS Glue Data Quality on the Data Catalog table after the job writes the data.",
      "C": "Use AWS Glue DataBrew profile jobs to generate statistics on each night's output.",
      "D": "Add SageMaker Model Monitor data quality checks to the training job."
    },
    "correct_answer": "A",
    "explanation": "Stop bad data before it's written → Data Quality rules inside the ETL job, an inspector on the assembly line. Catalog-based checks run on data that's already stored, so bad data lands first. DataBrew profiles describe data but don't block it. Model Monitor watches live endpoints, not ETL jobs."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 210, "concept": true,
    "skill": "1.3.3",
    "question": "A dataset for a loan approval model contains 90% approved and 10% rejected applications. After a random 80/20 split, the test set happens to contain almost no rejected applications, so the evaluation results are misleading. What should the ML engineer do?",
    "options": {
      "A": "Use 5-fold cross-validation with random splits.",
      "B": "Increase the test set to 40% of the data.",
      "C": "Oversample rejected applications in the test set.",
      "D": "Use a stratified split so that the training and test sets keep the same 90/10 class proportions."
    },
    "correct_answer": "D",
    "explanation": "A stratified split deals cards so every hand gets its fair share of each suit, keeping the 90/10 mix in both sets. Random folds and a bigger test set can still come out lopsided. Oversampling the test set changes the real-world mix, so the results become misleading in a different way."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 211,
    "skill": "1.3.6",
    "question": "A company collected 50,000 prompt-and-response pairs from its support logs to fine-tune a model. Before training, it must make sure that the pairs are well formed and that no response contains toxic or unsafe content. Which approach meets these requirements?",
    "options": {
      "A": "Fine-tune first, then add a Bedrock guardrail content filter to block toxic outputs.",
      "B": "Validate that each record has a non-empty prompt and response, remove duplicates, and screen the responses with a content safety check, such as Amazon Comprehend toxicity detection, before training.",
      "C": "Run SageMaker Clarify pre-training bias metrics on the dataset.",
      "D": "Use AWS Glue Data Quality to check that each JSON Lines file has valid syntax."
    },
    "correct_answer": "B",
    "explanation": "A model learns what it's fed, so check every pair before training: well formed, no duplicates, no toxic content. A guardrail afterward hides symptoms the model already learned. Clarify measures bias across groups, not toxic text. Syntax checks catch broken JSON but not unsafe content."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 212, "concept": true,
    "skill": "1.3.7",
    "question": "A dataset of house prices has 8% missing values in the 'lot_size' column. The column also contains a few extreme values from mansions. The ML engineer wants to fill in the missing values without letting the extreme values distort them. Which imputation method is MOST appropriate?",
    "options": {
      "A": "Fill missing values with the column mean.",
      "B": "Drop every row that has a missing lot_size.",
      "C": "Fill the missing values with the column's median.",
      "D": "Fill missing values with the most frequent value (the mode)."
    },
    "correct_answer": "C",
    "explanation": "With extreme outliers, use the median. If a billionaire walks into a café, the average income skyrockets but the middle person's doesn't change. The mean gets pulled up by mansions. Dropping 8% of rows wastes data. The mode doesn't suit a continuous measurement like lot size."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 213,
    "skill": "2.1.1",
    "question": "A company must summarize 300-page contracts in a single request on Amazon Bedrock. The contracts are in English and Japanese. Before comparing models on price and quality, what should the ML engineer check FIRST to shortlist candidate models?",
    "options": {
      "A": "Which model has the lowest price per 1,000 input tokens",
      "B": "Which model scores highest on public benchmark leaderboards",
      "C": "Which models support fine-tuning in Amazon Bedrock",
      "D": "Which models have a context window large enough for a 300-page contract and support both English and Japanese"
    },
    "correct_answer": "D",
    "explanation": "Start with the must-haves: can the model read the whole document, and does it handle both languages? Price, benchmarks and fine-tuning support only matter among models that pass those hard requirements."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 214, "concept": true,
    "skill": "2.1.3",
    "question": "A bank's credit model must be approved by regulators, who require a clear explanation of how each input affects every decision. A deep neural network is 1% more accurate than simpler models but cannot be explained easily. Which model should the ML engineer choose?",
    "options": {
      "A": "An interpretable model, such as logistic regression or a shallow decision tree",
      "B": "The deep neural network, explained with SageMaker Clarify SHAP values",
      "C": "A gradient-boosted ensemble of 500 trees",
      "D": "The deep neural network, with a model card describing its training data"
    },
    "correct_answer": "A",
    "explanation": "When regulators require a clear explanation of how each input affects every decision, choose a model that is explainable by design. SHAP gives estimates for a black box, but it isn't a direct readout. A 500-tree ensemble is hard to follow. A model card documents the model but doesn't explain each decision."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 215, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-managed-spot-training.html",
    "skill": "2.1.6",
    "question": "A team trains a large model for 30 hours each week on SageMaker AI. Training can be paused and resumed. The team wants to reduce training cost as much as possible. Which solution meets these requirements?",
    "options": {
      "A": "Purchase a 1-year SageMaker AI Savings Plan for the training instances.",
      "B": "Use SageMaker AI warm pools to keep instances ready between runs.",
      "C": "Use SageMaker AI managed Spot Training with checkpoints saved to Amazon S3 so that interrupted jobs resume where they stopped.",
      "D": "Use a larger instance type so that the job finishes in fewer hours."
    },
    "correct_answer": "C",
    "explanation": "Can be paused and resumed → Spot capacity at a deep discount, with checkpoints as bookmarks so interrupted jobs pick up where they stopped. A Savings Plan saves less than Spot for this pattern. Warm pools speed up startup but keep paying for instances. Larger instances cost more per hour."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 216, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-parallel-intro.html",
    "skill": "2.2.4",
    "question": "An ML engineer is training a model that is too large to fit in the memory of a single GPU, even with a batch size of 1. Which training approach will allow the job to run?",
    "options": {
      "A": "Data parallelism across multiple GPUs",
      "B": "Model parallelism, which splits the model's layers across multiple GPUs",
      "C": "Mixed-precision training on the same single GPU",
      "D": "Gradient accumulation with a batch size of 1"
    },
    "correct_answer": "B",
    "explanation": "A model too big for one GPU even at batch size 1 → model parallelism, which splits the model across GPUs like a huge jigsaw puzzle across several tables. Data parallelism copies the whole model to each GPU, so it still doesn't fit. Mixed precision and gradient accumulation reduce memory, but not enough when even batch size 1 fails."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 217, "concept": true,
    "skill": "2.2.5",
    "question": "A model scores poorly on both the training data and the validation data, and both scores are similar. What is the MOST likely problem, and what should the ML engineer try?",
    "options": {
      "A": "Overfitting; add dropout and early stopping",
      "B": "Concept drift; retrain on recent data",
      "C": "Data leakage; remove features computed from the target",
      "D": "Underfitting; use a more complex model or add more informative features"
    },
    "correct_answer": "D",
    "explanation": "Poor on training AND validation, with similar scores → underfitting: the model didn't learn the material. Give it more capacity or better features. Overfitting is good on training and bad on validation. Drift is when something used to work and the world changed. Leakage gives scores that are too good, not poor ones."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 218, "concept": true,
    "skill": "2.2.6",
    "question": "An ML engineer has three trained models: XGBoost, a random forest and a neural network. Each makes different kinds of mistakes, and none meets the accuracy target alone. Which approach is MOST likely to improve accuracy?",
    "options": {
      "A": "Combine the models in an ensemble, such as by averaging or voting on their predictions.",
      "B": "Run SageMaker AI automatic model tuning on the best single model.",
      "C": "Retrain the neural network with more epochs.",
      "D": "Keep only the model with the highest validation accuracy and retire the other two."
    },
    "correct_answer": "A",
    "explanation": "Models that make different kinds of mistakes → an ensemble: ask three experts and go with the majority, so individual errors cancel out. Tuning, retraining or keeping one model holds on to that model's blind spots, and none of them meets the target alone."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 219, "concept": true,
    "skill": "2.2.7",
    "question": "A GPU training job fails immediately with a CUDA out-of-memory error. The model fits on the GPU, but the job was configured with a very large batch size. Which change should the ML engineer make FIRST?",
    "options": {
      "A": "Switch to a GPU instance with more GPU memory.",
      "B": "Enable model parallelism.",
      "C": "Reduce the batch size.",
      "D": "Enable SageMaker AI managed warm pools."
    },
    "correct_answer": "C",
    "explanation": "Batch size is how many examples the GPU holds at once, like plates carried in one trip. When the model fits but the batch doesn't, carry fewer plates per trip. A bigger GPU works but costs more and isn't the first change. Model parallelism is for models that don't fit at all. Warm pools affect startup, not memory."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 220,
    "skill": "2.2.9",
    "question": "A RAG assistant for an electronics store answers concept questions well, but it fails when users type exact part numbers such as 'XR-4471-B'. The semantic search returns similar-sounding but wrong parts. Which change will improve retrieval for exact part numbers?",
    "options": {
      "A": "Use hybrid search, which combines semantic search with keyword matching.",
      "B": "Enable a reranker model on the knowledge base.",
      "C": "Switch to semantic chunking.",
      "D": "Switch to a larger, higher-dimension embeddings model."
    },
    "correct_answer": "A",
    "explanation": "Part numbers have no meaning to match on, so they need exact keyword matching. Hybrid search does both semantic and keyword search. A reranker only reorders whatever was found, and the right part was never found. Chunking and larger embeddings still rely on meaning, which doesn't help with codes."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 221, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/a2i-use-augmented-ai-a2i-human-review-loops.html",
    "skill": "2.3.7",
    "question": "A model extracts amounts from scanned invoices. Most extractions are correct, but low-confidence extractions must be reviewed by a person before payment. The company wants this review loop with the LEAST development effort. Which solution meets these requirements?",
    "options": {
      "A": "Use Amazon Textract confidence scores, and have a Lambda function email low-confidence invoices to a review team.",
      "B": "Use Amazon Augmented AI (Amazon A2I) to send only predictions below a confidence threshold to human reviewers.",
      "C": "Use SageMaker Ground Truth to relabel all invoices each month.",
      "D": "Use Amazon Bedrock model evaluation with human workers on a sample of invoices."
    },
    "correct_answer": "B",
    "explanation": "Humans review only uncertain predictions in production → Amazon A2I, which routes low-confidence results to reviewers with a built-in workflow. The Lambda-and-email approach is custom code with no review interface. Ground Truth is for labeling training data. Bedrock evaluation tests models offline and doesn't review live invoices."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 222,
    "skill": "2.3.10",
    "question": "Users say a RAG assistant's answers are sometimes off-topic. The team suspects that the knowledge base retrieves irrelevant chunks, but it isn't sure whether the problem is retrieval or generation. Which approach will isolate the problem with the LEAST effort?",
    "options": {
      "A": "Run an LLM-as-a-judge model evaluation on the final answers only.",
      "B": "Run an Amazon Bedrock knowledge base evaluation in retrieve-only mode to measure the relevance of retrieved context.",
      "C": "Enable the contextual grounding check on the responses.",
      "D": "Review Bedrock model invocation logs for off-topic answers."
    },
    "correct_answer": "B",
    "explanation": "To isolate search from writing, test the search step alone. A retrieve-only evaluation grades whether the right passages were pulled. Judging final answers mixes both steps together. The grounding check compares answers with whatever was retrieved, so irrelevant retrievals can still pass. Reading logs is manual and doesn't isolate the cause."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 223,
    "skill": "3.1.1",
    "question": "A company serves a high-volume text classification model on GPU instances and wants to lower its inference cost per prediction substantially. Its framework is supported by the AWS Neuron SDK. Which compute choice is MOST cost-effective?",
    "options": {
      "A": "Graviton-based CPU instances",
      "B": "SageMaker AI Serverless Inference",
      "C": "Spot Instances for the real-time endpoint",
      "D": "AWS Inferentia-based instances (for example, Inf2)"
    },
    "correct_answer": "D",
    "explanation": "AWS Inferentia chips are built specifically for running predictions, so for a supported framework they give a low cost per inference. Graviton CPUs can be cheap but are usually slower for heavy models at high volume. Serverless has no GPUs or accelerators and limited memory. Spot capacity can be interrupted, which a live endpoint can't afford."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 224,
    "skill": "3.1.4",
    "question": "A company wants to use a foundation model through a simple API. It doesn't want to choose instances, manage scaling or patch servers, and it pays per request. Which deployment option fits BEST?",
    "options": {
      "A": "Amazon Bedrock on-demand inference",
      "B": "SageMaker JumpStart with a SageMaker AI real-time endpoint",
      "C": "SageMaker AI Serverless Inference with the model container",
      "D": "Amazon Bedrock Provisioned Throughput"
    },
    "correct_answer": "A",
    "explanation": "No instances, no scaling and pay per request → Bedrock on demand. JumpStart deploys to instances you choose and pay for. Serverless Inference has no GPUs and limited memory, so it's a poor fit for large foundation models. Provisioned Throughput is a reserved-capacity commitment, not pay per request."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 225,
    "skill": "3.1.6",
    "question": "A company has a dozen internal REST APIs and AWS Lambda functions. It wants AI agents built with different frameworks to discover and call these tools in a standard way, without rewriting each tool. Which solution meets these requirements?",
    "options": {
      "A": "Add an action group for each API to every Bedrock agent.",
      "B": "Use Amazon Bedrock AgentCore Gateway to expose the APIs and Lambda functions as Model Context Protocol (MCP) tools.",
      "C": "Put the APIs behind Amazon API Gateway and share the OpenAPI specs with each team.",
      "D": "Register the APIs in AWS Service Catalog."
    },
    "correct_answer": "B",
    "explanation": "One standard way for agents from any framework to find and call tools → MCP, and AgentCore Gateway turns existing APIs and Lambda functions into MCP tools. Action groups work only for Bedrock agents and must be repeated per agent. API Gateway with shared specs still needs custom integration in each framework. Service Catalog is for provisioning resources."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 226, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/endpoint-auto-scaling-add-code-define.html",
    "skill": "3.2.6",
    "question": "A SageMaker AI real-time endpoint must add instances when traffic rises. The model's latency grows as each instance receives more requests per minute. Which metric should the ML engineer use for a target tracking scaling policy?",
    "options": {
      "A": "CPUUtilization",
      "B": "ModelLatency",
      "C": "SageMakerVariantInvocationsPerInstance",
      "D": "Invocation4XXErrors"
    },
    "correct_answer": "C",
    "explanation": "Requests per instance is how busy each server is, like customers per cashier, and it's the predefined target-tracking metric for SageMaker AI endpoints. CPU can work, but it doesn't always track load for I/O- or GPU-bound models. Latency is a result of load, not a direct load measure. 4XX errors are client mistakes, not load."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 227,
    "skill": "3.2.9",
    "question": "A customer service agent on Amazon Bedrock AgentCore forgets earlier parts of a conversation, and it doesn't remember a customer's preferences between sessions. Which solution meets these requirements with the LEAST custom code?",
    "options": {
      "A": "Store the conversation history in Amazon DynamoDB and write custom logic to summarize and retrieve it.",
      "B": "Send the full conversation history with every request.",
      "C": "Store each customer's preferences in a Bedrock knowledge base and sync it nightly.",
      "D": "Use Amazon Bedrock AgentCore Memory for short-term conversation memory and long-term memory across sessions."
    },
    "correct_answer": "D",
    "explanation": "An agent that remembers → AgentCore Memory, with short-term memory for what was said a minute ago and long-term memory for preferences kept between visits. DynamoDB works but is custom code. Resending everything grows costly and doesn't carry over between sessions. A nightly knowledge base sync is slow and isn't meant for per-user memory."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 228,
    "skill": "3.2.11",
    "question": "A team built an AI agent with an open-source agent framework. It wants to run the agent in production on AWS with automatic scaling, isolated user sessions and no servers to manage. Which service meets these requirements?",
    "options": {
      "A": "Amazon Bedrock AgentCore Runtime",
      "B": "AWS Lambda with the agent framework packaged as a function",
      "C": "Amazon ECS on AWS Fargate behind an Application Load Balancer",
      "D": "A SageMaker AI real-time endpoint"
    },
    "correct_answer": "A",
    "explanation": "Hosting an agent from any framework, serverless, with isolated user sessions → AgentCore Runtime, a managed hotel for agents where each guest gets a private room. Lambda has a 15-minute limit and no built-in session isolation for agents. Fargate works, but you manage scaling and session handling. SageMaker AI endpoints host models, not agent runtimes."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 229, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green.html",
    "skill": "3.3.1",
    "question": "A team deploys a new model to a SageMaker AI endpoint. It wants a small slice of traffic to go to the new model first, and automatic rollback if error rates rise. Which deployment configuration meets these requirements?",
    "options": {
      "A": "Blue/green deployment with all-at-once traffic shifting and CloudWatch alarms",
      "B": "Blue/green deployment with linear traffic shifting and no alarms",
      "C": "Blue/green deployment with canary traffic shifting and Amazon CloudWatch alarms for automatic rollback",
      "D": "Shadow testing with the new model as a shadow variant"
    },
    "correct_answer": "C",
    "explanation": "A small slice first, plus automatic rollback → canary with CloudWatch alarms. All-at-once sends all traffic in one step, so a bad model hits everyone. Linear shifts in steps, but without alarms nothing rolls back. Shadow testing never sends real responses to users, so it isn't a deployment."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 230, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deployment-guardrails-blue-green.html",
    "skill": "3.3.1",
    "question": "A company wants to shift traffic to a new model version gradually, in equal steps of 20% every 10 minutes, with automatic rollback if alarms fire. Which SageMaker AI deployment guardrail option fits?",
    "options": {
      "A": "Canary traffic shifting with a 20% canary",
      "B": "All-at-once traffic shifting with a 10-minute baking period",
      "C": "Rolling deployment with a batch size of 20% of instances",
      "D": "Linear traffic shifting"
    },
    "correct_answer": "D",
    "explanation": "Equal steps at regular intervals → linear, like walking up a staircase. Canary is one small step and then everything. All-at-once is one step with a waiting period. A rolling deployment replaces instances in batches rather than shifting traffic percentages between fleets."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 231, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
    "skill": "3.3.3",
    "question": "A SageMaker AI training job reads 5 TB of image files from Amazon S3 in the default File input mode and waits almost an hour for the download before training starts. The training script opens files by using normal file paths and must not be modified. Which change will remove the delay with the LEAST effort?",
    "options": {
      "A": "Switch the input mode to Pipe.",
      "B": "Switch the input mode to FastFile.",
      "C": "Mount an Amazon FSx for Lustre file system linked to the S3 bucket.",
      "D": "Copy the data to Amazon EFS and mount it as the input channel."
    },
    "correct_answer": "B",
    "explanation": "File mode downloads everything before starting. FastFile streams files on demand while they still look like normal files, so the script works unchanged. Pipe mode streams into a named pipe, so the script would have to change. FSx for Lustre also avoids the wait, but it means a new file system plus VPC setup. EFS needs a full copy and VPC networking."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 232, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
    "skill": "3.3.3",
    "question": "A distributed training job runs on 10 instances. Each instance should train on a different tenth of the dataset in Amazon S3, but currently every instance downloads the entire dataset. Which channel setting should the ML engineer change?",
    "options": {
      "A": "Set the S3 data distribution type to ShardedByS3Key.",
      "B": "Switch the input mode to FastFile.",
      "C": "Switch the input mode to Pipe with FullyReplicated distribution.",
      "D": "Use an FSx for Lustre file system for the channel."
    },
    "correct_answer": "A",
    "explanation": "ShardedByS3Key deals the files out so each worker gets its own pile. FastFile changes how files arrive, but every instance would still see the full dataset. Pipe with FullyReplicated still gives everyone everything. FSx for Lustre shares one file system, so the script would still see all of the data on every instance."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 233,
    "skill": "3.3.8",
    "question": "A team updates its Amazon Bedrock agent often. The production application must keep using a stable, tested agent version, and the team must be able to switch production to a new version, or back, without changing application code. Which solution meets these requirements?",
    "options": {
      "A": "Have the application call the working draft (TSTALIAS) of the agent.",
      "B": "Create a new agent for each release and update the agent ID in the application configuration.",
      "C": "Store the agent configuration in AWS CloudFormation and redeploy the agent for each change.",
      "D": "Create agent versions, and have the application call an alias that points to the approved version."
    },
    "correct_answer": "D",
    "explanation": "An alias is a nickname like \"production\" that you can point at any saved version, so you can switch forward or back with no code change. The draft alias always runs the latest untested edits. A new agent per release requires a config change each time. CloudFormation redeploys the agent but doesn't give you switchable versions."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 234,
    "skill": "3.3.11",
    "question": "New documents are added to an S3 bucket that feeds an Amazon Bedrock knowledge base several times each day. Answers must include new documents within an hour, with no manual steps. Which solution meets these requirements?",
    "options": {
      "A": "Configure an S3 event notification that triggers a full re-creation of the knowledge base.",
      "B": "Set up an AWS Glue crawler on the bucket to update the knowledge base.",
      "C": "Use an Amazon EventBridge schedule (or an S3 event) that invokes a Lambda function to start a knowledge base ingestion job.",
      "D": "Re-run a Bedrock fine-tuning job whenever documents change."
    },
    "correct_answer": "C",
    "explanation": "Automatic refresh → EventBridge or an S3 event triggers a Lambda function that calls StartIngestionJob, a sync that processes only new and changed files. Re-creating the knowledge base is slow and wasteful. A Glue crawler updates the Glue Data Catalog, not a knowledge base. Fine-tuning doesn't update retrieval."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 235,
    "skill": "4.1.1",
    "question": "An operations team wants a ready-made dashboard that shows invocation counts, latency, token usage and errors for the company's Amazon Bedrock model calls, without building custom dashboards. Which solution meets these requirements?",
    "options": {
      "A": "Use Amazon CloudWatch generative AI observability.",
      "B": "Build a custom CloudWatch dashboard from Bedrock invocation metrics.",
      "C": "Enable AWS CloudTrail and query it with Amazon Athena.",
      "D": "Use SageMaker Model Monitor on the Bedrock model."
    },
    "correct_answer": "A",
    "explanation": "A ready-made generative AI dashboard → CloudWatch generative AI observability, which includes prebuilt model invocation views. A custom dashboard works, but you build it yourself. CloudTrail shows API calls, not latency or token usage. Model Monitor works with SageMaker AI endpoints, not Bedrock."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 236, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/inference-recommender.html",
    "skill": "4.2.1",
    "question": "A team is unsure which instance type to use for a new SageMaker AI endpoint. It needs the lowest-cost instance that still meets a 100 ms latency target at its expected traffic. Which solution provides this evidence with the LEAST effort?",
    "options": {
      "A": "Use AWS Compute Optimizer recommendations for the endpoint.",
      "B": "Deploy to the smallest instance type and enable auto scaling.",
      "C": "Use SageMaker Autopilot to choose the instance type.",
      "D": "Run a SageMaker Inference Recommender load test job."
    },
    "correct_answer": "D",
    "explanation": "Evidence about latency and cost for your own model across instance types → Inference Recommender, which test-drives the model on several instance types. Compute Optimizer gives recommendations for EC2 and other resources based on past usage, not load tests of a new endpoint. The smallest instance type plus auto scaling is a guess. Autopilot builds models, not instance recommendations."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 237,
    "skill": "4.2.9",
    "question": "A company's Amazon Bedrock bill is growing quickly. Analysis shows that prompts include long, repeated instructions, and responses are often much longer than users need. Which combination of actions will reduce cost? (Choose two.)",
    "options": {
      "A": "Shorten and reuse prompt instructions, using prompt caching for the repeated parts.",
      "B": "Switch to batch inference for all requests, including live ones.",
      "C": "Set a lower max_tokens limit for responses.",
      "D": "Move the instructions into a Bedrock knowledge base.",
      "E": "Purchase Provisioned Throughput."
    },
    "correct_answer": "AC",
    "explanation": "Models charge per token, like a telegram priced per word. Send fewer tokens (shorter, cached instructions) and accept fewer back (lower max_tokens). Batch inference can't serve live users. A knowledge base doesn't shrink fixed instructions. Provisioned Throughput reserves capacity and doesn't reduce tokens."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 238,
    "skill": "4.2.10",
    "question": "A knowledge base contains 5 million documents. Each day, about 1,000 documents change. The team currently deletes and re-embeds the entire collection every night, and embedding costs are high. Which change will reduce cost the MOST?",
    "options": {
      "A": "Switch to a cheaper embeddings model and re-embed all 5 million documents.",
      "B": "Reduce the embedding dimension and keep re-embedding the full collection each night.",
      "C": "Use the knowledge base's incremental sync so that only new, changed or deleted documents are processed.",
      "D": "Move the vectors to S3 Vectors."
    },
    "correct_answer": "C",
    "explanation": "Re-embedding 5 million documents to update 1,000 is like reprinting a whole encyclopedia to fix one page. An incremental sync updates only what changed. A cheaper model or smaller dimensions still repeat all the work every night. S3 Vectors lowers storage cost, not embedding cost."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 239, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/interface-vpc-endpoint.html",
    "skill": "3.2.4",
    "question": "A SageMaker AI endpoint and the application that calls it both run in private subnets with no internet access. The application's calls to InvokeEndpoint time out. What should the ML engineer do?",
    "options": {
      "A": "Create an interface VPC endpoint for the SageMaker AI Runtime service.",
      "B": "Create an interface VPC endpoint for the SageMaker AI API service.",
      "C": "Add a NAT gateway to the private subnets.",
      "D": "Create an S3 gateway endpoint."
    },
    "correct_answer": "A",
    "explanation": "InvokeEndpoint goes to the SageMaker AI Runtime service (runtime.sagemaker), so it needs that interface endpoint. The SageMaker AI API endpoint handles control-plane calls like CreateEndpoint, not predictions. A NAT gateway breaks the no-internet design. S3 gateway endpoints reach only S3."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 240,
    "skill": "3.3.2",
    "question": "An MLOps team stores model code in GitHub. It wants AWS CodePipeline to start automatically whenever code is pushed to the main branch, without storing personal access tokens in the pipeline. Which solution meets these requirements?",
    "options": {
      "A": "Use a GitHub webhook that calls API Gateway and a Lambda function to start the pipeline.",
      "B": "Mirror the GitHub repository to AWS CodeCommit every hour, and use CodeCommit as the source.",
      "C": "Create an AWS CodeConnections connection to GitHub and use it as the pipeline's source.",
      "D": "Store a GitHub personal access token in Secrets Manager and use the GitHub version 1 source action."
    },
    "correct_answer": "C",
    "explanation": "CodeConnections is the managed link between AWS and GitHub. It starts the pipeline on each push without you storing tokens. Webhooks plus Lambda is custom glue. Hourly mirroring adds delay and extra parts. The version 1 GitHub action relies on a personal access token, which the question rules out."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 241, "source": "https://docs.aws.amazon.com/config/latest/developerguide/sagemaker-endpoint-configuration-kms-key-configured.html",
    "skill": "4.3.4",
    "question": "A compliance team must be alerted automatically if anyone creates a SageMaker AI endpoint configuration that does not use an AWS KMS key for encryption. Which solution meets this requirement with the LEAST effort?",
    "options": {
      "A": "Create an EventBridge rule on CreateEndpointConfig API calls that invokes a Lambda function to check for a KMS key.",
      "B": "Enable the AWS Config managed rule that checks SageMaker AI endpoint configurations for a KMS key, and send noncompliant results to Amazon SNS.",
      "C": "Use a service control policy that denies CreateEndpointConfig without a KMS key, and review CloudTrail weekly.",
      "D": "Use Amazon Inspector to scan endpoint configurations."
    },
    "correct_answer": "B",
    "explanation": "Automatic checks that resources follow a rule, with alerts → an AWS Config managed rule plus SNS. EventBridge plus Lambda works but is custom code. An SCP prevents the configuration, which is useful, but the question asks to be alerted, and weekly reviews aren't automatic. Inspector scans for software vulnerabilities, not configuration settings."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 242,
    "skill": "4.3.7",
    "question": "A company retrains a fraud model weekly on data from several partner feeds. The security team worries that an attacker could insert fake records to teach the model to approve fraud (data poisoning). Which measures reduce this risk? (Choose two.)",
    "options": {
      "A": "Restrict write access to the training data bucket with IAM and bucket policies, and turn on S3 versioning.",
      "B": "Encrypt the training data with an AWS KMS customer managed key.",
      "C": "Validate incoming partner data against expected schemas and value ranges, and alert on unusual distribution changes before training.",
      "D": "Enable Amazon Macie on the training bucket.",
      "E": "Use SageMaker Model Monitor on the production endpoint."
    },
    "correct_answer": "AC",
    "explanation": "Data poisoning is someone slipping bad ingredients into the pantry. Lock the pantry (only trusted writers, with versions to roll back) and inspect deliveries (validate data and flag odd changes before training). Encryption protects confidentiality, not correctness. Macie finds sensitive data, not fake records. Model Monitor catches problems only after a poisoned model is already live."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 243, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-data-bias.html",
    "skill": "1.3.4",
    "question": "A company is training an image model to screen job applicants' profile photos for a professional appearance score. Before training, it must check whether the training images under-represent certain demographic groups. Which solution provides these bias metrics with the LEAST custom code?",
    "options": {
      "A": "Use Amazon Rekognition to detect faces, and count demographic attributes in a custom script.",
      "B": "Use SageMaker Clarify post-training bias metrics on the trained model.",
      "C": "Use SageMaker Clarify to compute pre-training bias metrics on the dataset and its demographic labels.",
      "D": "Use SageMaker Model Monitor bias drift on the endpoint."
    },
    "correct_answer": "C",
    "explanation": "Checking a dataset for under-representation before training → Clarify pre-training bias metrics, the fairness inspector checking ingredients before cooking. A Rekognition script is custom work. Post-training metrics and bias drift come after training or deployment, but the question says before training."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 244, "source": "https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html",
    "skill": "1.1.5",
    "question": "Analysts query a 2 TB training dataset in Amazon S3 with Amazon Athena, usually selecting only 3 of its 120 columns. The data is stored as CSV, and queries are slow and expensive. Which change will improve performance and reduce cost the MOST?",
    "options": {
      "A": "Compress the CSV files with gzip.",
      "B": "Partition the CSV data by date in Amazon S3.",
      "C": "Convert the data to JSON Lines with Snappy compression.",
      "D": "Convert the data to a columnar format such as Apache Parquet or ORC."
    },
    "correct_answer": "D",
    "explanation": "Reading 3 of 120 columns → a columnar format, a filing cabinet with one drawer per column, so Athena scans only 3 drawers. That's faster and cheaper, because Athena bills by data scanned. Compression and date partitions help, but every query still reads all 120 columns in each file. JSON Lines is still row-based."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 245, "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html",
    "skill": "Well-Architected ML Lens: feature consistency",
    "question": "A fraud model performed well in testing but makes poor predictions in production. Investigation shows that the training pipeline computed 'average transaction amount over 30 days' in Spark, while the production application computes the same feature with different Python code that rounds values and handles time zones differently. Which solution will prevent this problem with the LEAST ongoing effort?",
    "options": {
      "A": "Rewrite the production feature code in Spark so that it matches the training job.",
      "B": "Store the feature in SageMaker Feature Store and have both training and real-time inference read it from the same feature group.",
      "C": "Use SageMaker Model Monitor to detect the skew and retrain when it appears.",
      "D": "Add the rounding logic to the training pipeline so that it matches production."
    },
    "correct_answer": "B",
    "explanation": "Features computed one way for training and another way in production is training-serving skew. Feature Store is one shared pantry, so both sides use exactly the same values. Rewriting or copying the logic leaves two codebases that can drift apart again. Model Monitor can detect skew but doesn't prevent it."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 246,
    "skill": "Well-Architected Generative AI Lens: excessive agency",
    "question": "A Bedrock agent helps employees look up order status. Its Lambda action group runs with an IAM role that has full access to the orders database, including delete permissions. A security review flags this as a risk. What should the ML engineer do?",
    "options": {
      "A": "Add agent instructions that say it must never delete orders, and enable a guardrail denied topic for deletions.",
      "B": "Require user confirmation in the agent before any action group call.",
      "C": "Log all action group calls with CloudTrail and review deletions weekly.",
      "D": "Restrict the Lambda function's IAM role to read-only access on only the tables the agent needs, and add a permissions boundary."
    },
    "correct_answer": "D",
    "explanation": "Excessive agency means more permissions than the job needs, like giving a receptionist the vault keys. Remove the delete permission from the role itself. Instructions and guardrails can be bypassed. Confirmations add friction but still leave the agent able to delete. Weekly log reviews only notice the damage after it's done."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 247,
    "skill": "Well-Architected Generative AI Lens: agent stopping conditions",
    "question": "A research agent built on Amazon Bedrock sometimes gets stuck calling the same search tool repeatedly, running for 30 minutes and consuming large numbers of tokens. Which solution will control cost and prevent runaway sessions?",
    "options": {
      "A": "Set stopping conditions for the workflow, such as a maximum number of steps or tool calls, and a timeout.",
      "B": "Enable prompt caching for the agent's instructions.",
      "C": "Lower the model's temperature to make the agent more decisive.",
      "D": "Add a CloudWatch alarm on token usage that notifies the team."
    },
    "correct_answer": "A",
    "explanation": "An agent stuck in a loop is a taxi meter running in a traffic jam. Stopping conditions (maximum steps or tool calls, plus a timeout) end the ride and cap the bill. Caching lowers the price per loop but not the number of loops. Temperature doesn't guarantee the loop ends. An alarm only tells you after tokens are spent."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 248,
    "skill": "Well-Architected Generative AI Lens: vector size",
    "question": "A company stores 500 million embeddings at 1,536 dimensions for a RAG application. Vector storage costs are high, and testing shows that search quality barely changes at lower dimensions. Which change will reduce vector store cost the MOST?",
    "options": {
      "A": "Move the vectors from OpenSearch Serverless to Aurora PostgreSQL with pgvector.",
      "B": "Increase the chunk size so that fewer vectors are stored.",
      "C": "Use an embeddings model configuration with a smaller output dimension, such as 512, and re-embed the documents.",
      "D": "Enable hybrid search to reduce the number of vector lookups."
    },
    "correct_answer": "C",
    "explanation": "Each vector is a list of numbers, and fewer numbers means less storage, like saving photos at a lower resolution nobody can tell apart. Testing showed quality barely changes, so reduce the dimension. Moving databases keeps the same vector size. Larger chunks cut the count but can hurt retrieval quality. Hybrid search doesn't change storage."
  },
  {
    "topic": "Topic 3 - C02 Guide Coverage",
    "origin": "written",
    "number": 249,
    "skill": "Well-Architected Generative AI Lens: ground-truth evaluation",
    "question": "A team updates its prompts and switches foundation model versions every few weeks. After one update, answer quality dropped, and nobody noticed for a month. Which practice would catch these regressions before release with the LEAST ongoing effort?",
    "options": {
      "A": "Collect user thumbs-up and thumbs-down feedback in production and review it monthly.",
      "B": "Maintain a ground-truth dataset of test prompts with approved answers, and run an automated evaluation, such as an Amazon Bedrock evaluation job, against it before each release.",
      "C": "Enable a contextual grounding check on all responses.",
      "D": "Monitor CloudWatch latency and error metrics after each release."
    },
    "correct_answer": "B",
    "explanation": "A ground-truth set is a fixed answer key. Re-run it before every change and compare the scores, so a drop shows up immediately instead of a month later. User feedback arrives too late. A grounding check filters some bad answers but doesn't measure overall quality. Latency and error metrics don't measure answer quality."
  }
]);
