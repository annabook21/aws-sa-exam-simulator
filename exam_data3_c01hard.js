// MLA-C01 hard set for Domains 1 and 2 (341+). Written by Claude on 2026-10-30 after the user's 707/720 C01 result,
// where Domains 1 and 2 needed improvement. Each question maps to a C01 task statement ("task") and, unless marked
// "concept", was written after reading the AWS documentation page in its "source" field.
// These are new scenarios, so they test reasoning instead of memory of the original bank.
EXAM_DATA.push(...[
  // ---------- Domain 1 · Task 1.1 Ingest and store data ----------
  {
    "number": 341, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html",
    "question": "Factory sensors send CSV records to an Amazon Data Firehose stream that delivers to Amazon S3. Analysts need the data stored as Apache Parquet so that Amazon Athena queries are faster and cheaper. The solution must have the LEAST operational overhead. What should an ML engineer do?",
    "options": {
      "A": "Turn on record format conversion in Firehose with a Parquet serializer and an AWS Glue Data Catalog table that describes the CSV columns.",
      "B": "Add an AWS Lambda transform to the Firehose stream that converts each CSV record to JSON, and turn on record format conversion to Parquet using an AWS Glue Data Catalog table for the schema.",
      "C": "Keep delivering CSV to S3 and schedule an hourly AWS Glue ETL job that rewrites new files as Parquet.",
      "D": "Replace Firehose with Kinesis Data Streams and write a consumer application on Amazon EC2 that batches records into Parquet files."
    },
    "correct_answer": "B",
    "explanation": "Firehose's built-in format conversion only reads JSON. AWS says that for CSV or other formats you first use Lambda to turn the records into JSON, and then Firehose converts them to Parquet or ORC using a schema from the Glue Data Catalog. Think of it as a translator who only reads English: give them a French letter and you need someone to translate it to English first. A fails because the converter can't read CSV directly. C works but adds a second pipeline, a schedule and up to an hour of delay. D means building and running your own servers and code."
  },
  {
    "number": 342, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
    "question": "A training job reads 2 TB of image files from an Amazon S3 prefix. Each run spends about 40 minutes downloading data before the first epoch starts. The training script opens files with ordinary local file paths, and the team cannot rewrite the data loader. Which change reduces startup time the MOST with the least code change?",
    "options": {
      "A": "Switch the input mode to Pipe mode.",
      "B": "Keep File mode and attach a larger Amazon EBS volume to the training instance.",
      "C": "Switch the input mode to FastFile mode.",
      "D": "Move the dataset to Amazon EFS and mount it in the training job."
    },
    "correct_answer": "C",
    "explanation": "FastFile mode shows the S3 objects as normal files (a POSIX file system), but it streams each file only when the script reads it. Training starts without waiting for the full download, and the script keeps using normal file paths. It's like streaming a movie instead of downloading the whole file before pressing play. A also streams, but through a named pipe (a FIFO), so the data loader has to change. AWS also says Pipe mode is largely replaced by FastFile. B still downloads all 2 TB before training starts. D needs the data copied into EFS first plus a VPC setup, which is more work for this problem."
  },
  {
    "number": 343, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html",
    "question": "A distributed training job on 64 instances reads millions of small objects that are all stored under a single Amazon S3 prefix. The job's logs show many HTTP 503 Slow Down errors. Which change MOST directly addresses the errors?",
    "options": {
      "A": "Spread the objects across many prefixes (for example, hash-based prefixes) so that reads are parallelized across prefixes.",
      "B": "Turn on S3 Transfer Acceleration for the bucket.",
      "C": "Switch the training input mode from File mode to Pipe mode.",
      "D": "Add more training instances so that each instance reads fewer objects."
    },
    "correct_answer": "A",
    "explanation": "S3 supports at least 5,500 GET requests per second per prefix, and there's no limit on the number of prefixes. While S3 scales up to a new request rate you can see 503 Slow Down errors. Spreading the data across more prefixes multiplies the total capacity (10 prefixes means about 55,000 reads per second). It's like opening more checkout lanes instead of making one lane faster. B speeds up long-distance transfers, not request rates. C changes how data reaches the container, but the job sends the same requests to the same prefix. D increases the request rate on that one prefix, which makes the problem worse."
  },
  {
    "number": 344, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html",
    "question": "A clickstream producer writes to a Kinesis data stream with 10 provisioned shards. Total ingest is about 4 MB/s, well under the stream's total capacity, but producers receive ProvisionedThroughputExceededException errors. Amazon CloudWatch shows one shard receiving most of the writes. The partition key is the event type, and 80% of events are page_view. What is the BEST fix?",
    "options": {
      "A": "Increase the stream's data retention period to 7 days.",
      "B": "Register enhanced fan-out consumers on the stream.",
      "C": "Double the number of shards without changing the partition key.",
      "D": "Change the partition key to a high-cardinality value, such as a session ID, so that records are spread evenly across shards."
    },
    "correct_answer": "D",
    "explanation": "Kinesis hashes the partition key to pick a shard, and each shard accepts at most 1 MB/s or 1,000 records/s of writes. If 80% of records share one key, they all land on one shard (a 'hot shard') however many shards exist. That's why C fails: a single key still maps to a single shard. Picture 10 checkout lanes where the sign sends everyone with a basket to lane 3. A changes how long data is stored. B increases read throughput, not write throughput."
  },
  {
    "number": 345, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-storage-configurations.html",
    "question": "A fraud model needs each customer's latest features at inference time with millisecond latency. The data science team also needs historical feature values for training, as they were at the time of each past transaction. Which SageMaker Feature Store setup meets both needs with the LEAST custom code?",
    "options": {
      "A": "Enable only the online store and query it with Amazon Athena to build training datasets.",
      "B": "Enable both the online store and the offline store in the feature group. Use GetRecord on the online store for inference and the offline store's historical records for training.",
      "C": "Enable only the offline store and call GetRecord against it from the inference application.",
      "D": "Write features to Parquet files in Amazon S3 and to an Amazon DynamoDB table, and keep them in sync with an AWS Lambda function."
    },
    "correct_answer": "B",
    "explanation": "The online store is a low-latency lookup that keeps only the latest record for each ID. The offline store keeps every historical record in S3 for training and batch work. When you enable both, AWS keeps them in sync so training and serving don't drift apart. Think of a phone's lock screen (current status, instant) and its photo library (full history). A fails because the online store has no history. C fails because the offline store isn't built for sub-second reads. D rebuilds Feature Store by hand and risks the two copies drifting apart."
  },
  {
    "number": 346, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store-concepts.html",
    "question": "A feature group has both the online store and the offline store enabled. A late-arriving record is ingested for customer 42 with an EventTime EARLIER than the record that already exists for customer 42. What is the result?",
    "options": {
      "A": "The online store keeps the existing record because it has the later event time. The offline store keeps both records.",
      "B": "The online store replaces the existing record with the late record because it was ingested most recently. The offline store keeps both records.",
      "C": "Both stores reject the late record because its event time is older.",
      "D": "The online store keeps both versions, and the offline store keeps only the latest one."
    },
    "correct_answer": "A",
    "explanation": "AWS: the online store 'only contains the record corresponding to the latest event time, whereas the offline store contains all historic records.' So the online store compares event times, not arrival order, and the older record doesn't overwrite the newer one. The offline store simply adds it to the history. Think of the online store as a scoreboard that only shows the latest score and the offline store as the full game log. B confuses arrival time with event time. C and D get the behavior of the two stores wrong."
  },
  {
    "number": 347, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html",
    "question": "A 5 TB dataset is stored as CSV in Amazon S3. Most Amazon Athena queries and feature-engineering jobs read only 3 of its 200 columns, and query costs are high. Which storage format change will MOST reduce the data scanned?",
    "options": {
      "A": "Compress the CSV files with gzip.",
      "B": "Convert the data to JSON Lines.",
      "C": "Convert the data to Apache Avro.",
      "D": "Convert the data to Apache Parquet."
    },
    "correct_answer": "D",
    "explanation": "Parquet (like ORC) is columnar: values are stored column by column, so a query that needs 3 columns reads only those 3. AWS describes Parquet and ORC as columnar formats that 'save space and enable faster queries compared to row-oriented formats like JSON.' It's like a filing cabinet with one drawer per column, so you open only the drawers you need. A makes files smaller, but every row (all 200 columns) still has to be decompressed and read. B is row-based and larger. C is also row-based; it's good for streaming writes and schema evolution, not for reading a few columns."
  },
  {
    "number": 348, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/glue-connections.html",
    "question": "Customer profiles are stored in Amazon RDS for PostgreSQL, and transaction history is stored as Parquet files in Amazon S3. Every night, an ML engineer needs one joined training dataset written to S3. The solution must be serverless and need the LEAST ongoing operations. What should the engineer do?",
    "options": {
      "A": "Run a cron job on an Amazon EC2 instance that exports RDS tables to CSV, then join the data in a SageMaker notebook.",
      "B": "Load both sources into a provisioned Amazon Redshift cluster each night, join them with SQL, and unload the result to S3.",
      "C": "Create an AWS Glue connection to the RDS database, catalog both sources with crawlers, and schedule a Glue ETL (Spark) job that joins them and writes Parquet to S3.",
      "D": "Use AWS Database Migration Service to copy the S3 transaction files into RDS, then join them with SQL in RDS."
    },
    "correct_answer": "C",
    "explanation": "A Glue connection stores how to reach a JDBC data store such as RDS, and Glue crawlers and ETL jobs reuse it. A scheduled Glue Spark job can read the RDS tables and the S3 Parquet files, join them and write the result, with no servers to manage. It's a delivery service that picks up from two warehouses and drops off one combined box. A and B add servers or clusters you have to run. D sends data in the wrong direction and turns a transactional database into a big analytics engine."
  },
  {
    "number": 349, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
    "question": "A team runs dozens of training jobs a day over the same 50 TB image dataset in Amazon S3. The training code reads small files in random order and needs very high throughput and low-latency file access. S3 must stay the source of truth. Which training data source BEST fits?",
    "options": {
      "A": "An Amazon FSx for Lustre file system linked to the S3 bucket and mounted by the training jobs, which run in a VPC.",
      "B": "An Amazon EFS file system that the training jobs mount.",
      "C": "FastFile mode reading directly from the S3 prefix.",
      "D": "File mode, with S3 Transfer Acceleration turned on for the bucket."
    },
    "correct_answer": "A",
    "explanation": "AWS says FSx for Lustre can scale to hundreds of GB/s of throughput and millions of IOPS with low-latency file retrieval, and mounting it is fast whatever the dataset size. Linking it to S3 keeps S3 as the source of truth while many jobs share the fast copy. It's like a high-speed local library branch stocked from the main archive. B: AWS says the data must already live in EFS, so you'd have to copy 50 TB there and keep it in sync, and FSx for Lustre is the option AWS describes for this level of throughput. C: AWS says FastFile works with random access but 'works best when data is read sequentially.' D still downloads 50 TB for every job."
  },
  {
    "number": 350, "domain": 1, "task": "1.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-access-training-data.html",
    "question": "A preprocessing fleet on Amazon EC2 already writes cleaned training data to an Amazon EFS file system. An ML engineer wants SageMaker AI training jobs to read this data directly, without copying it to Amazon S3. What is required?",
    "options": {
      "A": "Use FastFile mode and point the channel at the EFS file system.",
      "B": "Use Pipe mode with the EFS file system as the source.",
      "C": "Use AWS DataSync to copy the data to S3 before every training job.",
      "D": "Specify the EFS file system as the channel's file system data source and configure the training job to connect to a VPC that can reach it."
    },
    "correct_answer": "D",
    "explanation": "SageMaker can mount EFS (and FSx for Lustre) as training input. AWS says the data must already be in EFS and 'your training job must connect to a VPC to access Amazon EFS.' Here the data is already in EFS, so a VPC connection and a file system data source are all you need. A and B are S3 streaming modes; FastFile supports S3 prefixes only. C works but adds a copy step the question tells you to avoid."
  },
  // ---------- Domain 1 · Task 1.2 Transform data and feature engineering ----------
  {
    "number": 351, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "question": "A categorical column named city has about 30,000 distinct values, and many of them are misspellings (for example, 'California' and 'Calfornia'). One-hot encoding would create 30,000 sparse columns. Which SageMaker Data Wrangler encoding BEST fits?",
    "options": {
      "A": "One-hot encode with Drop last category turned on.",
      "B": "Ordinal encode.",
      "C": "Similarity encode.",
      "D": "One-hot encode after removing every city that appears fewer than 10 times."
    },
    "correct_answer": "C",
    "explanation": "AWS recommends similarity encoding when you have 'a large number of categorical variables' and 'noisy data'. It builds low-dimensional embeddings in which similar strings get similar vectors, so 'Calfornia' lands next to 'California'. It's like a postal worker who still delivers a letter with a typo in the city name. A only drops one column out of 30,000. B gives each city an arbitrary number, which suggests an order that doesn't exist, and treats every typo as a different city. D throws away rare cities and still leaves thousands of columns."
  },
  {
    "number": 352, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "question": "A numeric feature for a k-nearest neighbors model contains a few extreme values. The extreme values are real and must stay in the data. The feature must be scaled so that these few values don't distort the scale for everything else. Which Data Wrangler Process numeric scaler is MOST appropriate?",
    "options": {
      "A": "Min Max Scaler",
      "B": "Standard Scaler",
      "C": "Max Absolute Scaler",
      "D": "Robust Scaler"
    },
    "correct_answer": "D",
    "explanation": "AWS: Robust Scaler scales 'using statistics that are robust to outliers', meaning the median and quartile range rather than the mean, min or max. A few huge values barely move it. Think of measuring a typical salary with the median so one billionaire in the room doesn't skew it. A and C use the min, max or largest value, so one extreme value squashes everyone else toward zero. B uses the mean and standard deviation, which outliers pull around. Since the outliers must stay, removing them isn't an option."
  },
  {
    "number": 353, "domain": 1, "task": "1.2", "concept": true,
    "question": "A linear regression model uses an annual_spend feature that is heavily right-skewed: most customers spend $0–$500, but a few spend over $1,000,000. The team wants to reduce the skew, keep every row, and keep the order of values. Which transformation should they apply?",
    "options": {
      "A": "A log transformation, such as log(1 + x) to handle zeros.",
      "B": "One-hot encoding of annual_spend.",
      "C": "Removing all rows above the 99th percentile.",
      "D": "Min-max scaling to the range 0 to 1."
    },
    "correct_answer": "A",
    "explanation": "A log transform pulls in the long right tail: $10 becomes about 2.4, $1,000,000 becomes about 13.8, and the order is preserved. The +1 handles $0 values, because log(0) is undefined. It's like a map's zoom-out that still shows the small streets. B treats a number as a category, which is meaningless. C deletes rows, which the team doesn't want. D changes the range but not the shape: the data stays just as skewed. (Standard ML concept; the C01 guide lists log transformation under Task 1.2.)"
  },
  {
    "number": 354, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "question": "8% of the values in a heavily right-skewed income column are missing. The engineer wants to fill the gaps with a single statistic using the SageMaker Data Wrangler Impute missing transform. Which choice is BEST?",
    "options": {
      "A": "Impute the mean.",
      "B": "Impute the median.",
      "C": "Drop the income column.",
      "D": "Fill missing values with 0."
    },
    "correct_answer": "B",
    "explanation": "Data Wrangler's Impute missing lets you fill numeric gaps with the mean or the median. With skewed data, a few high earners drag the mean upward, while the median stays at a typical value. If 9 people earn $50k and one earns $10M, the mean is about $1M, but the median is $50k. A therefore fills gaps with unrealistic values. C throws away a likely useful feature to fix 8% missing values. D invents a false value of $0 income."
  },
  {
    "number": 355, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "question": "A temperature sensor can physically report only values from -40°C to 150°C. Any reading outside that range is a hardware glitch and must be removed. Which SageMaker Data Wrangler Handle outliers transform fits BEST?",
    "options": {
      "A": "Standard deviation numeric outliers, with 3 standard deviations and the Remove fix method.",
      "B": "Quantile numeric outliers, with the bottom and top 1% removed.",
      "C": "Min-Max numeric outliers, with a lower threshold of -40, an upper threshold of 150, and the Remove fix method.",
      "D": "Robust standard deviation numeric outliers, with the Clip fix method."
    },
    "correct_answer": "C",
    "explanation": "AWS says to use the Min-Max outlier transform 'if you know threshold values that demark outliers.' You know the exact physical limits here, so set them and remove anything outside. A and B use statistics, so they could remove valid readings (for example, a genuinely hot day in the top 1%) or keep invalid ones. D clips glitches to the boundary instead of removing them, which keeps fake values in the data."
  },
  {
    "number": 356, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/managed-flink/latest/java/what-is.html",
    "question": "IoT devices stream readings into Amazon Kinesis Data Streams. An ML feature pipeline must continuously compute a 5-minute rolling average per device, keep state between events, and handle late-arriving events. Which service is the BEST fit?",
    "options": {
      "A": "An AWS Lambda function triggered by the stream that computes the average for each batch it receives.",
      "B": "An Amazon Data Firehose stream with a Lambda transform that adds the average to each record.",
      "C": "An hourly AWS Glue ETL job that reads the stream's data from S3.",
      "D": "Amazon Managed Service for Apache Flink"
    },
    "correct_answer": "D",
    "explanation": "Rolling windows, per-device state and late events are exactly what Apache Flink is built for. AWS lists custom timers 'to implement custom windowing or late event handling' and fine-grained control over state among Flink's capabilities, and the managed service runs it for you. A and B see each small batch on its own and keep no memory between invocations, so a true 5-minute window per device would mean building your own state store. C is batch and runs up to an hour late, so it isn't continuous."
  },
  {
    "number": 357, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-automated-labeling.html",
    "question": "A team must draw bounding boxes on 800 images and wants to cut labeling cost by turning on Amazon SageMaker Ground Truth automated data labeling. What will happen?",
    "options": {
      "A": "Automated data labeling can't be used. It requires at least 1,250 data objects, and AWS strongly suggests at least 5,000.",
      "B": "Ground Truth auto-labels every image whose predicted confidence is above 50% and sends the rest to humans.",
      "C": "Automated labeling works only for semantic segmentation, so the team must change the task type.",
      "D": "Automated labeling works only with a custom labeling task template."
    },
    "correct_answer": "A",
    "explanation": "AWS: 'The minimum number of objects allowed for automated data labeling is 1,250, but we strongly suggest providing a minimum of 5,000 objects.' The labeling model needs enough human-labeled examples to learn from. B is wrong because Ground Truth sets its own confidence threshold to meet fixed accuracy targets (for example, 95% for image classification). C is wrong because bounding-box object detection is supported. D is reversed: automated labeling is not supported for custom task types. (Ground Truth is now closed to new customers, but C01 still tests it.)"
  },
  {
    "number": 358, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/sms-automated-labeling.html",
    "question": "A company must label 100,000 support tickets. Each ticket gets exactly one of 12 categories. The company wants the lowest labeling cost by letting a model label the easy tickets. Which Ground Truth setup supports this?",
    "options": {
      "A": "A multi-label text classification job with automated data labeling turned on.",
      "B": "A single-label text classification job with automated data labeling turned on.",
      "C": "A custom task template with automated data labeling turned on.",
      "D": "A streaming labeling job with automated data labeling turned on."
    },
    "correct_answer": "B",
    "explanation": "Automated data labeling (active learning) is available only for four built-in task types: single-label image classification, semantic segmentation, bounding-box object detection, and single-label text classification. One category per ticket is single-label, so B fits. A is multi-label, which isn't supported. C: custom task types aren't supported. D: AWS says streaming labeling jobs don't support automated data labeling. The model labels the high-confidence tickets and sends the low-confidence ones to humans. (Ground Truth is closed to new customers, but C01 still tests it.)"
  },
  {
    "number": 359, "domain": 1, "task": "1.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/blazingtext.html",
    "question": "An ML engineer will train the SageMaker AI BlazingText algorithm in supervised (text classification) mode. The raw data is a CSV file with the columns label,review_text. How should the training data be prepared?",
    "options": {
      "A": "Upload the CSV as is, with the header row, to the train channel.",
      "B": "Convert the CSV to RecordIO-protobuf with Float32 tensors.",
      "C": "Write one sentence per line, prefix each line with __label__<label>, and tokenize the text so that tokens are separated by spaces.",
      "D": "One-hot encode every word into a sparse matrix and upload it as LibSVM."
    },
    "correct_answer": "C",
    "explanation": "AWS: BlazingText 'expects a single preprocessed text file with space-separated tokens', one sentence per line, with labels marked by the __label__ prefix (for example, '__label__4 linux ready for prime time , intel says'). Notice that punctuation is split off as separate tokens. A isn't a supported format for this mode. B is the format for algorithms such as Factorization Machines. D throws away the word order and context that BlazingText's fastText-style model uses."
  },
  {
    "number": 360, "domain": 1, "task": "1.2", "concept": true,
    "question": "A dataset has two categorical features: shirt_size (S, M, L, XL) and payment_method (card, cash, wallet). Which encoding plan is MOST appropriate?",
    "options": {
      "A": "Ordinal-encode both features.",
      "B": "One-hot encode shirt_size and ordinal-encode payment_method.",
      "C": "Similarity-encode both features.",
      "D": "Ordinal-encode shirt_size and one-hot encode payment_method."
    },
    "correct_answer": "D",
    "explanation": "Shirt sizes have a natural order (S < M < L < XL), so ordinal encoding (0,1,2,3) keeps useful information. Payment methods have no order, so one-hot encoding (a yes/no column for each method) avoids implying that 'wallet > cash'. A invents an order for payment methods. B does it backwards. C is meant for many noisy categories, not 3–4 clean ones. (Standard ML concept; the C01 guide lists one-hot, binary and label encoding under Task 1.2.)"
  },
  // ---------- Domain 1 · Task 1.3 Data integrity and preparing data ----------
  {
    "number": 361, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-bias-metric-class-imbalance.html",
    "question": "A loan dataset has 9,000 applicants aged 25–60 (facet a) and 1,000 applicants in other age groups (facet d). What is the class imbalance (CI), and what does it mean?",
    "options": {
      "A": "CI = 0.8. Facet a has far more samples, so the model may fit facet d poorly.",
      "B": "CI = 0.9. Facet d is 90% underrepresented.",
      "C": "CI = -0.8. Facet d has more samples than facet a.",
      "D": "CI = 0.1. The dataset is close to balanced."
    },
    "correct_answer": "A",
    "explanation": "CI = (na − nd) / (na + nd) = (9,000 − 1,000) / 10,000 = 0.8. Values range from -1 to 1. Positive values mean facet a has more samples, and values near ±1 are very imbalanced. AWS warns that models fit the larger facet at the smaller one's expense and can overfit the small one. B divides by the wrong total. C gets the sign wrong (negative would mean d is larger). D is just 1,000/10,000, the share of facet d, which isn't the CI formula."
  },
  {
    "number": 362, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-data-bias-metric-true-label-imbalance.html",
    "question": "In a training dataset, 600 of 1,000 applicants in facet a are labeled approved, and 150 of 500 applicants in facet d are labeled approved. The team wants a pre-training metric that measures the gap in POSITIVE LABEL RATES between the groups. Which metric and value apply?",
    "options": {
      "A": "Class imbalance (CI) = 0.33",
      "B": "Difference in proportions of labels (DPL) = 0.30",
      "C": "Disparate impact (DI) = 0.50",
      "D": "Difference in proportions of labels (DPL) = 450"
    },
    "correct_answer": "B",
    "explanation": "DPL = qa − qd = 600/1,000 − 150/500 = 0.60 − 0.30 = 0.30. A positive value means facet a gets more positive labels. A is a real number (CI = (1,000−500)/1,500 ≈ 0.33), but CI compares group SIZES, not label rates. C is a post-training metric based on the model's predictions, not on training labels. D subtracts counts instead of proportions. Memory trick: CI counts heads, DPL compares approval rates, DI compares the model's approval rates."
  },
  {
    "number": 363, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/canvas-transform.html",
    "question": "A tabular fraud dataset with mostly numeric features has only 1% fraud cases. The team wants to add NEW synthetic fraud examples rather than duplicating existing ones, using SageMaker Data Wrangler's Balance data transform. Which option should they choose?",
    "options": {
      "A": "Random oversampling",
      "B": "Random undersampling",
      "C": "Synthetic Minority Oversampling Technique (SMOTE)",
      "D": "A stratified train/test split"
    },
    "correct_answer": "C",
    "explanation": "AWS: SMOTE 'uses samples from the underrepresented category to interpolate new synthetic minority samples', creating new points between existing fraud cases. Data Wrangler uses only numeric features to find these neighbors, which fits this dataset. A duplicates real fraud rows, which can cause overfitting to those exact rows. B throws away legitimate rows to balance the classes. D keeps the 1% ratio in each split; it doesn't change the imbalance."
  },
  {
    "number": 364, "domain": 1, "task": "1.3", "concept": true,
    "question": "A visual-inspection dataset has 20,000 images of good parts but only 200 images of defective parts. The model rarely predicts the defect class. Which approach BEST addresses the imbalance without throwing away data?",
    "options": {
      "A": "Run SMOTE on the raw pixel values of the defect images.",
      "B": "Delete 19,800 of the good-part images so that the classes are 200 vs 200.",
      "C": "Remove the defect class and train an anomaly detector instead.",
      "D": "Augment the defect images with flips, rotations, crops and brightness changes so that the minority class has more varied examples."
    },
    "correct_answer": "D",
    "explanation": "For images, the standard way to generate more minority examples is augmentation: realistic variations of the real defect photos. The C01 guide lists 'synthetic data generation' and augmentation as ways to address class imbalance. A blends pixel values between images, which produces blurry, unrealistic pictures, not new defect photos. B balances the classes but throws away 99% of the good-part data. C changes the whole problem instead of fixing the data. (Standard ML concept.)"
  },
  {
    "number": 365, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html",
    "question": "A nightly AWS Glue ETL job writes the dataset used to retrain a model. Bad records (null customer_id, negative amounts) must be stopped BEFORE they reach the training bucket, and the engineer must be able to see exactly which records failed. What should the engineer do?",
    "options": {
      "A": "Add AWS Glue Data Quality to the ETL job with DQDL rules, route records that fail to a quarantine location, and write only passing records to the training bucket.",
      "B": "Run AWS Glue Data Quality rules against the Data Catalog table after each nightly load.",
      "C": "Run an Amazon Macie discovery job on the training bucket every night.",
      "D": "Create an Amazon CloudWatch alarm on the ETL job's run duration."
    },
    "correct_answer": "A",
    "explanation": "AWS describes Data Quality in ETL jobs as 'proactive': it can 'identify and filter out bad data before you load a data set into your data lake.' AWS's comparison table shows that identifying the specific records that failed is supported for ETL jobs but NOT for Data Catalog rules. That makes B the trap: it checks after the load and can't point to the bad rows. C looks for sensitive data, not quality problems. D tracks how long the job ran, not whether the data is correct."
  },
  {
    "number": 366, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/glue/latest/dg/detect-PII.html",
    "question": "Free-text notes in a training dataset contain Social Security numbers. Compliance requires that the real values are never stored in the training data. However, the same SSN must always map to the same replacement value so that analysts can still link records belonging to one person. Which AWS Glue Detect PII action meets this requirement?",
    "options": {
      "A": "Redact detected text with a fixed string such as ******.",
      "B": "Apply a cryptographic hash (SHA-256) to the detected values.",
      "C": "Enrich the data with detection results in a new column and keep the original value.",
      "D": "Partially redact the detected text, leaving the last four digits unmasked."
    },
    "correct_answer": "B",
    "explanation": "Hashing replaces each detected value with its SHA-256 output. The same SSN always produces the same hash, and the hash can't be turned back into the SSN. Think of a fingerprint: it can identify a match without revealing the person. A replaces every SSN with the same ******, so records can no longer be linked. C keeps the real SSN. D still exposes part of the number and doesn't give each person a consistent ID."
  },
  {
    "number": 367, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html",
    "question": "Before an ML team can use data from 40 AWS accounts, the security team must find out which Amazon S3 buckets contain PII. Nothing needs to be changed or masked yet, only discovered and reported, centrally across the organization. Which service fits?",
    "options": {
      "A": "AWS Glue Detect PII transform",
      "B": "Amazon Comprehend DetectPiiEntities",
      "C": "Amazon Macie with automated sensitive data discovery, managed through AWS Organizations",
      "D": "Amazon GuardDuty"
    },
    "correct_answer": "C",
    "explanation": "Macie inventories S3 buckets and automatically discovers and reports sensitive data, including PII, using managed data identifiers. A Macie administrator account can manage it centrally for an AWS Organization. It's a building inspector who surveys every room and writes a report without moving anything. A transforms data inside a Glue job you build, one dataset at a time. B analyzes text you send to it; it doesn't scan buckets. D watches logs for threats and suspicious activity, not data contents."
  },
  {
    "number": 368, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html",
    "question": "Data residency rules require that EU customer data is never processed outside eu-central-1. This includes SageMaker AI training jobs launched by data scientists in any member account of an AWS Organization. Which control BEST enforces this across all accounts?",
    "options": {
      "A": "Attach an IAM policy to each data scientist's role that allows only eu-central-1.",
      "B": "Add an S3 bucket policy that denies reads from IP addresses outside the EU.",
      "C": "Turn on Amazon Macie in eu-central-1.",
      "D": "Attach a service control policy (SCP) to the organizational unit that denies actions when aws:RequestedRegion is not eu-central-1 (exempting global services such as IAM)."
    },
    "correct_answer": "D",
    "explanation": "AWS: aws:RequestedRegion 'compare[s] the AWS Region that was called in the request with the Region that you specify', and you can use it 'to control which Regions can be requested.' An SCP applies that guardrail to every principal in every member account, and account admins can't override it. IAM itself runs only from us-east-1, so global services such as IAM must be exempted. A is per role, so it's easy to miss a role or for an admin to edit it. B checks IP addresses, not Regions, and doesn't stop a training job in another Region. C discovers sensitive data; it doesn't block anything."
  },
  {
    "number": 369, "domain": 1, "task": "1.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateTrainingJob.html",
    "question": "A regulated company trains a model on 8 instances using distributed training. The data is already encrypted at rest with AWS KMS. A new requirement says that data passing BETWEEN the training instances must also be encrypted. What should the ML engineer configure?",
    "options": {
      "A": "Set EnableInterContainerTrafficEncryption to True on the training job, and expect that training might take longer.",
      "B": "Set EnableNetworkIsolation to True on the training job.",
      "C": "Specify a KMS key in VolumeKmsKeyId.",
      "D": "Create an S3 gateway VPC endpoint for the training job's VPC."
    },
    "correct_answer": "A",
    "explanation": "AWS: 'To encrypt all communications between ML compute instances in distributed training, choose True.' AWS also warns that training might take longer, depending on how much the instances communicate. B blocks the container from calling out to the internet; it doesn't encrypt node-to-node traffic. C encrypts the storage volumes, which is data at rest. D keeps S3 traffic on a private path, but that's traffic between the job and S3, not between the training nodes."
  },
  {
    "number": 370, "domain": 1, "task": "1.3", "concept": true,
    "question": "A churn model uses 36 months of monthly customer snapshots. With a random 80/20 split it scores 97% validation accuracy, but in production it reaches only 70%. What is the MOST likely cause, and what is the fix?",
    "options": {
      "A": "The model is underfitting. Add more layers or trees.",
      "B": "Rows from future months leaked into training. Split by time: train on earlier months and validate on later months.",
      "C": "The classes are imbalanced. Use a stratified random split.",
      "D": "Training ran for too few epochs. Train longer."
    },
    "correct_answer": "B",
    "explanation": "A random split mixes months, so the model trains on data from after some validation rows and effectively sees the future. That inflates validation scores. Splitting by time copies real life: learn from the past, predict the future. It's like studying with next week's answer key mixed into your notes. A and D would show low validation scores, not a gap between validation and production. C still shuffles across time and keeps the leak. (Standard ML concept; Task 1.3 covers dataset splitting to reduce prediction bias.)"
  },
  {
    "number": 371, "domain": 1, "task": "1.3", "concept": true,
    "question": "A small binary dataset has only 2% positive cases. After a random split into 5 cross-validation folds, one validation fold contains zero positive examples, so recall can't be measured on it. What should the engineer do?",
    "options": {
      "A": "Increase the number of folds to 20.",
      "B": "Shuffle the data again and repeat the random split until every fold has positives.",
      "C": "Use a stratified split so that each fold keeps about 2% positive examples.",
      "D": "Remove the fold that has no positives."
    },
    "correct_answer": "C",
    "explanation": "Stratified splitting samples within each class, so every fold keeps the same class ratio as the full dataset. It's like dealing cards so every player gets the same mix of suits. A makes folds smaller, so empty folds become more likely. B is trial and error and still random. D throws away data and biases the evaluation. (Standard ML concept.)"
  },
  // ---------- Domain 2 · Task 2.1 Choose a modeling approach ----------
  {
    "number": 372, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html",
    "question": "A retailer must forecast weekly demand for 4,000 related products, including some new products with little history. The planners want ranges (P10/P90), not just a single number. Which SageMaker AI approach fits BEST?",
    "options": {
      "A": "Train one DeepAR model on all of the product time series together.",
      "B": "Train a separate ARIMA model for each product.",
      "C": "Train a Linear Learner regression model on last week's sales.",
      "D": "Train a Random Cut Forest model on the sales history."
    },
    "correct_answer": "A",
    "explanation": "DeepAR trains one model jointly across many related series. AWS says it 'outperforms the standard ARIMA and ETS methods' when you have hundreds of related series, and it can forecast new series similar to the ones it trained on. It produces probabilistic forecasts (quantiles), so P10/P90 come built in. Think of a teacher who has taught 4,000 students and can size up a new student quickly. B fits each product alone, so new products have almost no history to learn from. C gives single-point estimates and ignores the series structure. D detects anomalies; it doesn't forecast."
  },
  {
    "number": 373, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/deepar.html",
    "question": "A DeepAR model was trained with a dynamic_feat time series that flags promotions (1 = promotion week). At inference, the team sends the target history and the promotion flags for the same past weeks, but the forecast requests fail. What is the fix?",
    "options": {
      "A": "Remove dynamic_feat from inference requests. It's used only during training.",
      "B": "Send dynamic_feat values covering the history PLUS the next prediction_length time points (the planned future promotions).",
      "C": "Retrain the model with a larger context_length.",
      "D": "Encode the promotion flag as a cat feature instead."
    },
    "correct_answer": "B",
    "explanation": "AWS: if the model was trained with dynamic_feat 'you must provide this field for inference', and each feature 'has to have the length of the provided target plus the prediction_length. In other words, you must provide the feature value in the future.' That makes sense: to forecast next week's demand, the model needs to know whether next week has a promotion. A breaks the requirement. C doesn't fix the missing future values. D changes the meaning: cat is for fixed group labels (such as product type), not week-by-week values."
  },
  {
    "number": 374, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/fact-machines.html",
    "question": "An ad platform needs to predict the probability that a user clicks an ad. The features are one-hot encoded user IDs, ad IDs and page categories, giving millions of extremely sparse columns. Which built-in algorithm and training input format fit BEST?",
    "options": {
      "A": "Factorization Machines, trained on CSV files.",
      "B": "k-means clustering on the one-hot matrix.",
      "C": "Factorization Machines in binary classification mode, trained on recordIO-protobuf with Float32 tensors.",
      "D": "Factorization Machines in multiclass mode, with one class per ad."
    },
    "correct_answer": "C",
    "explanation": "AWS: Factorization Machines is built for 'high dimensional sparse datasets, such as click prediction and item recommendation.' It learns interactions between pairs of features (this user type × this ad category). For training it supports 'only the recordIO-protobuf format with Float32 tensors', and AWS says CSV isn't a good fit for sparse data. That rules out A. D fails because FM supports only binary classification and regression. B is unsupervised, so it can't predict clicks."
  },
  {
    "number": 375, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/ip-insights.html",
    "question": "A web application wants to trigger MFA when a user logs in from an IP address that is unusual FOR THAT USER. The team has a log of past (user_id, IPv4 address) login pairs, with no labels. Which SageMaker AI built-in algorithm fits BEST?",
    "options": {
      "A": "Random Cut Forest on login counts per hour.",
      "B": "k-means clustering on IP address octets.",
      "C": "XGBoost trained to predict a 'fraud' label.",
      "D": "IP Insights"
    },
    "correct_answer": "D",
    "explanation": "IP Insights is an unsupervised algorithm that learns which IP addresses each entity (a user ID or account) normally uses, from (entity, IPv4) pairs. It scores how anomalous a new pair is. AWS's own example is a web login server triggering MFA when the score is high. A finds unusual numbers in general but doesn't learn what's normal per user. B groups IPs, which says nothing about whether a given user normally uses one. C needs fraud labels, which the team doesn't have."
  },
  {
    "number": 376, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "An agriculture company needs to measure the exact area covered by weeds in drone photos of fields. Accuracy at the level of the weed's outline matters. Which SageMaker AI built-in algorithm should they use?",
    "options": {
      "A": "Semantic Segmentation",
      "B": "Object Detection",
      "C": "Image Classification",
      "D": "Amazon Rekognition DetectLabels"
    },
    "correct_answer": "A",
    "explanation": "Semantic segmentation tags every pixel with a class. AWS calls it a 'fine-grained, pixel-level approach', so you can count weed pixels to get the exact area. B draws rectangles around objects, and a rectangle around an irregular weed patch includes lots of crop, which overstates the area. C gives one label for the whole image ('has weeds'). D returns general labels and bounding boxes for common objects, not a pixel-level mask of your weeds."
  },
  {
    "number": 377, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/rekognition/latest/customlabels-dg/what-is.html",
    "question": "A manufacturer needs to recognize 12 of its own machine part types in assembly-line photos. It has about 300 labeled images, no ML specialists, and wants a working model this week. What should it use?",
    "options": {
      "A": "Amazon Rekognition DetectLabels",
      "B": "Amazon Rekognition Custom Labels",
      "C": "Train the SageMaker AI Image Classification - MXNet algorithm from scratch.",
      "D": "Ask a foundation model in Amazon Bedrock to describe each photo."
    },
    "correct_answer": "B",
    "explanation": "Custom Labels builds on models already trained on tens of millions of images. Instead of thousands of images, you upload 'a small set of training images (typically a few hundred images or less)', and AutoML handles the training, with no ML expertise needed. AWS names 'specific machine parts... on an assembly line' as a use case. A detects only common labels such as 'car', not your 12 part types. C, from scratch with 300 images, would need ML skills and would likely overfit. D is generic and isn't trained on your parts."
  },
  {
    "number": 378, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/translate/latest/dg/how-custom-terminology.html",
    "question": "A company uses Amazon Translate to localize product pages. Brand and product names (for example, 'Amazon Photos') keep getting translated into French words instead of staying unchanged. Which feature fixes this with the LEAST effort?",
    "options": {
      "A": "Train a SageMaker AI Seq2Seq model on company documents.",
      "B": "Detect brand names with Amazon Comprehend and post-process the output.",
      "C": "Create a custom terminology file that maps each brand name to the required target term, and include it in translation requests.",
      "D": "Switch to Amazon Transcribe with a custom vocabulary."
    },
    "correct_answer": "C",
    "explanation": "Custom terminology exists to make sure 'your brand names, character names, model names, and other unique content get translated to the desired result.' AWS's own example is keeping 'Amazon Photos' as is in French. It's a short glossary you hand the translator. A builds a whole translation model. B adds custom code around the problem. D converts speech to text; it doesn't translate."
  },
  {
    "number": 379, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-shapley-values.html",
    "question": "A bank has an accurate XGBoost credit model. A regulator now requires the bank to explain, for each denied applicant, which features drove that decision. The bank wants to keep the current model and do the LEAST rework. What should the ML engineer do?",
    "options": {
      "A": "Replace the model with Linear Learner so that the coefficients explain the decisions.",
      "B": "Turn on SageMaker Model Monitor data quality monitoring.",
      "C": "Attach SageMaker Debugger built-in rules to the next training job.",
      "D": "Use SageMaker Clarify to generate SHAP feature attributions for individual predictions."
    },
    "correct_answer": "D",
    "explanation": "Clarify's SHAP attributions show 'the contribution that each feature made to model predictions' and can be 'provided for specific predictions', which is exactly a per-applicant explanation. It works with the existing model, so nothing is retrained. A could explain decisions, but it means rebuilding the model and likely losing accuracy, which is more rework. B watches data drift. C debugs training. Neither explains a decision. (Clarify is closed to new customers, but the C01 guide names it directly.)"
  },
  {
    "number": 380, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "A company wants to fine-tune an open-weight LLM on proprietary data, host it on instance types it chooses inside its own VPC, and control the inference container. Which option fits BEST?",
    "options": {
      "A": "Amazon SageMaker JumpStart: fine-tune the pretrained model and deploy it to a SageMaker AI endpoint in the company's VPC.",
      "B": "Amazon Bedrock on-demand inference with the base model.",
      "C": "Amazon Q Business",
      "D": "Amazon Comprehend custom classification"
    },
    "correct_answer": "A",
    "explanation": "JumpStart provides pretrained models and solution templates that you fine-tune and deploy onto SageMaker AI infrastructure you control: instance types, VPC and container. Bedrock (B) is a fully managed API: great when you want no infrastructure, but you don't choose instances or run the container yourself. C is a ready-made workplace assistant, not a model you host. D classifies text; it doesn't host an LLM. Rule of thumb: Bedrock = 'just give me an API'; JumpStart = 'give me the model and my own servers'."
  },
  {
    "number": 381, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/blazingtext.html",
    "question": "A support team wants to route emails into 8 fixed categories. It has 200,000 labeled emails (about 1 GB of text), and it needs the lowest training and inference cost that still gives strong accuracy. Which approach fits BEST?",
    "options": {
      "A": "Fine-tune a large LLM through SageMaker JumpStart on GPU instances and host it on a GPU endpoint.",
      "B": "Train BlazingText in supervised mode on a CPU instance (for example, a C5) and host it.",
      "C": "Send each email to a large foundation model in Amazon Bedrock with a few-shot prompt.",
      "D": "Train an Object2Vec model and use k-means on the embeddings."
    },
    "correct_answer": "B",
    "explanation": "With plenty of labels and a fixed set of categories, a fast dedicated text classifier is the cheapest strong option. AWS says BlazingText's supervised mode reaches 'performance on par with the state-of-the-art deep learning text classification algorithms' and recommends a C5 instance for datasets under 2 GB. A and C can work, but they pay for a very large model (GPU hosting, or per-token charges on every email) to do a simple job. D is unsupervised clustering, so it ignores the labels you already have."
  },
  {
    "number": 382, "domain": 2, "task": "2.1",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/algos.html",
    "question": "A team wants a strong tabular classification model with the LEAST manual effort. They want the model to combine several model types by stacking them automatically. Which SageMaker AI built-in algorithm matches this?",
    "options": {
      "A": "Linear Learner",
      "B": "k-NN",
      "C": "AutoGluon-Tabular",
      "D": "TabTransformer"
    },
    "correct_answer": "C",
    "explanation": "AWS describes AutoGluon-Tabular as 'an open-source AutoML framework that succeeds by ensembling models and stacking them in multiple layers.' The stacking is built in. Stacking is like a panel of experts plus a chair who learns whose opinion to trust for which kind of question. A, B and D each train one model type; you would have to build any ensemble yourself."
  },
  // ---------- Domain 2 · Task 2.2 Train and refine models ----------
  {
    "number": 383, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html",
    "question": "A team has budget for 100 tuning trials and can run 50 at a time. Their custom training container reports the objective metric ONLY once, at the end of training. They want the tuning job to finish as fast as possible. Which SageMaker AMT strategy fits BEST?",
    "options": {
      "A": "Hyperband",
      "B": "Bayesian optimization",
      "C": "Grid search",
      "D": "Random search"
    },
    "correct_answer": "D",
    "explanation": "With random search, choices 'don't depend on the results of previous training jobs', so 'you can run the maximum number of concurrent training jobs without changing the performance of the tuning.' 50 at a time works well. A needs intermediate results, and AWS says it 'should only be used to tune iterative algorithms that publish results at different resource levels'; this container reports only once at the end. B learns from finished jobs, so running 50 at once leaves it little to learn from between rounds. C supports only categorical parameters."
  },
  {
    "number": 384, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-how-it-works.html",
    "question": "An engineer creates a hyperparameter tuning job that uses the Hyperband strategy for a neural network that reports validation accuracy after each epoch. They want underperforming trials to stop early. How should TrainingJobEarlyStoppingType be set?",
    "options": {
      "A": "AUTO, so that SageMaker's median-based early stopping runs alongside Hyperband.",
      "B": "AUTO, and also set MaxParallelTrainingJobs to 1.",
      "C": "Leave it unset and switch the strategy to Bayesian, which is required for early stopping.",
      "D": "OFF, because Hyperband uses its own internal early-stopping mechanism."
    },
    "correct_answer": "D",
    "explanation": "AWS: 'The parameter TrainingJobEarlyStoppingType in the HyperParameterTuningJobConfig API must be set to OFF when using the Hyperband internal early stopping feature.' Hyperband already stops weak trials and moves the epochs to promising ones. A is the trap: it sounds like more early stopping, but it's the wrong setting with Hyperband. B removes parallelism for no reason. C is false: early stopping isn't limited to Bayesian."
  },
  {
    "number": 385, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-define-ranges.html",
    "question": "An engineer tunes learning_rate over the range 0.0001 to 1.0. In past linear-scale searches, almost every trial landed between 0.1 and 1.0. Which ScalingType should the engineer set?",
    "options": {
      "A": "Logarithmic",
      "B": "Linear",
      "C": "ReverseLogarithmic",
      "D": "Change learning_rate to a categorical parameter with only the values 0.1 and 1.0."
    },
    "correct_answer": "A",
    "explanation": "AWS uses this exact case: on a linear scale, searching 0.0001–1.0 spends 'on average... 90 percent of your training budget' between 0.1 and 1.0. A logarithmic scale samples each order of magnitude evenly (0.0001, 0.001, 0.01, 0.1...). It's like a ruler where each tick is 10× the previous one. B is what caused the problem. C is for ranges sensitive to values very close to 1 and only works on ranges within 0 ≤ x < 1.0, so this range (which includes 1.0) doesn't qualify. D throws away the small values entirely."
  },
  {
    "number": 386, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-warm-start.html",
    "question": "Last month a hyperparameter tuning job found good settings. This month there is NEW training data and an updated version of the training container image. The team wants the new tuning job to benefit from last month's results. What should they use?",
    "options": {
      "A": "A warm start with the type IDENTICAL_DATA_AND_ALGORITHM.",
      "B": "A warm start with the type TRANSFER_LEARNING.",
      "C": "A new tuning job that copies last month's best values as static hyperparameters.",
      "D": "Warm start isn't possible after the data changes, so start a brand-new tuning job."
    },
    "correct_answer": "B",
    "explanation": "TRANSFER_LEARNING allows input data, ranges and limits that differ from the parent job, and 'the training algorithm image can also be a different version.' IDENTICAL_DATA_AND_ALGORITHM requires the 'same input data and training image', so A fails twice. C skips the search entirely. D is false: AWS lists 'to tune a model using new data that you received' as a reason to use warm start. Remember: up to 5 parent jobs, and the objective metric must stay the same."
  },
  {
    "number": 387, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/xgboost_hyperparameters.html",
    "question": "A SageMaker AI XGBoost model has a training AUC of 0.99 but a validation AUC of 0.78. Which TWO changes are MOST likely to reduce this overfitting? (Choose two.)",
    "options": {
      "A": "Increase max_depth from 6 to 12.",
      "B": "Increase num_round to 4,000 and remove early_stopping_rounds.",
      "C": "Decrease max_depth and increase min_child_weight.",
      "D": "Set subsample and colsample_bytree to about 0.7.",
      "E": "Increase eta from 0.3 to 0.9."
    },
    "correct_answer": "CD",
    "explanation": "AWS says that increasing max_depth makes the model 'more complex and likely to be overfit', and that a larger min_child_weight makes the algorithm 'more conservative'. So C simplifies each tree. For subsample, AWS says sampling half the rows to grow each tree 'prevents overfitting'; sampling columns works the same way, so each tree sees a different slice of the data (D). A makes overfitting worse. B keeps fitting the training data with no stopping point. E makes each step bigger and less conservative (eta shrinks updates 'to prevent overfitting')."
  },
  {
    "number": 388, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/xgboost_hyperparameters.html",
    "question": "An XGBoost fraud model is trained on data with 1 fraud case per 99 legitimate cases. Recall on fraud is poor. The team wants a quick fix WITHOUT resampling the data. What should they change?",
    "options": {
      "A": "Set eval_metric to accuracy.",
      "B": "Increase max_depth.",
      "C": "Increase eta.",
      "D": "Set scale_pos_weight to about 99 (the number of negative cases divided by the number of positive cases)."
    },
    "correct_answer": "D",
    "explanation": "AWS: scale_pos_weight 'controls the balance of positive and negative weights. It's useful for unbalanced classes. A typical value to consider: sum(negative cases) / sum(positive cases).' Here that's 99/1, so each fraud case counts as much as 99 legitimate ones and the model can't ignore fraud anymore. A would reward predicting 'not fraud' every time (99% accuracy). B and C change model complexity and step size; they don't address the class imbalance."
  },
  {
    "number": 389, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-managed-spot-training.html",
    "question": "A custom PyTorch training job runs for about 10 hours on GPU instances. The company wants to cut training cost as much as possible and can tolerate interruptions and delays. Which configuration is correct?",
    "options": {
      "A": "Turn on managed spot training, write checkpoints to /opt/ml/checkpoints with a CheckpointConfig S3 URI, and set MaxWaitTimeInSeconds higher than MaxRuntimeInSeconds.",
      "B": "Turn on managed spot training without checkpoints. SageMaker resumes interrupted jobs from where they stopped.",
      "C": "Turn on managed spot training and set MaxWaitTimeInSeconds lower than MaxRuntimeInSeconds so that the job fails fast.",
      "D": "Turn on managed spot training. If Spot capacity runs out, SageMaker automatically falls back to On-Demand instances."
    },
    "correct_answer": "A",
    "explanation": "Managed spot training can save up to 90%. With checkpoints, SageMaker copies them to S3 and copies them back when the job restarts, so training 'can then resume from the last checkpoint instead of restarting'. AWS recommends checkpoints for anything but short jobs, and MaxWaitTimeInSeconds 'must be larger than MaxRuntimeInSeconds'. B is false: without checkpoints an interrupted job starts over. C is an invalid setting. D is false: AWS says managed spot training 'does not fall back to on-demand instances.'"
  },
  {
    "number": 390, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training.html",
    "question": "A team is training a transformer model with tens of billions of parameters. The model doesn't fit in the memory of a single GPU, even with a batch size of 1. Which distributed training strategy is required?",
    "options": {
      "A": "Data parallelism across more GPUs.",
      "B": "Model parallelism, so that parts of the model are spread across multiple GPUs.",
      "C": "A larger global batch size.",
      "D": "Pipe mode for the training data channel."
    },
    "correct_answer": "B",
    "explanation": "AWS: data parallelism 'still requires developers to be able to fit at least the model and a single record in a computing device.' When the model itself is too big, you 'partition the model over multiple computing devices', which is model parallelism. Think of a piano too big for one mover: you split it among several people rather than hiring more people who each try to carry a whole piano. A gives every GPU a full copy of the model, so it fails. C needs more memory, not less. D changes how data is read, not where the model lives."
  },
  {
    "number": 391, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training.html",
    "question": "A model fits comfortably on one GPU, but training on a 20 TB dataset takes 10 days on a single GPU instance. The team needs training to finish much faster with the same model. What should they do?",
    "options": {
      "A": "Switch to model parallelism across 8 GPUs.",
      "B": "Increase the number of epochs.",
      "C": "Use data parallel training across multiple GPU instances (for example, with the SageMaker distributed data parallel library).",
      "D": "Move to a smaller instance type to save cost."
    },
    "correct_answer": "C",
    "explanation": "With data parallelism, each GPU holds a copy of the model and processes different batches, then the GPUs synchronize their weight updates. That splits a huge dataset across many workers. It's like 8 people grading different stacks of the same exam with the same answer key. A splits the model, which isn't needed here and adds communication overhead. B adds work. D slows things down. Note that the global batch size equals the number of replicas times the per-replica batch size, so you may need to adjust the learning rate."
  },
  {
    "number": 392, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-train-storage-env-var-summary.html",
    "question": "A script-mode PyTorch training job completes successfully, but no model.tar.gz appears in the S3 output path, so the model can't be deployed. The script saves the model to /tmp/model.pt. What is the fix?",
    "options": {
      "A": "Save the model to /opt/ml/output/data.",
      "B": "Save the model to /opt/ml/checkpoints.",
      "C": "Increase VolumeSizeInGB.",
      "D": "Save the model to the directory in the SM_MODEL_DIR environment variable (/opt/ml/model)."
    },
    "correct_answer": "D",
    "explanation": "SageMaker compresses /opt/ml/model (SM_MODEL_DIR) into a tar.gz and uploads it to S3 when the job ends. AWS calls it the path for 'storing the final model artifact... from where the model artifact is deployed.' /tmp is scratch space that's never uploaded. A is for other outputs such as metrics and TensorBoard files ('a different path from the one for storing the final model artifact'). B is for checkpoints, which sync uncompressed during training for resuming, not for deployment. C doesn't change which folder gets uploaded."
  },
  {
    "number": 393, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/pytorch.html",
    "question": "A PyTorch model was trained on premises. The company wants to serve it on a SageMaker AI real-time endpoint with the LEAST effort. What should the ML engineer do?",
    "options": {
      "A": "Package the model weights (and an inference script if needed) as model.tar.gz in Amazon S3, and deploy it with the prebuilt SageMaker AI PyTorch serving container.",
      "B": "Build a custom container from scratch with a web server, push it to Amazon ECR, and deploy it.",
      "C": "Retrain the model with a SageMaker AI built-in algorithm and deploy that model instead.",
      "D": "Convert the model to ONNX and serve it from an AWS Lambda function behind Amazon API Gateway."
    },
    "correct_answer": "A",
    "explanation": "AWS supports deploying 'a PyTorch model that I trained outside of SageMaker AI' to an endpoint using its PyTorch container and SDK model classes. You supply the artifacts as model.tar.gz in S3, plus an inference script if you need custom handling, and AWS runs the serving stack. B (bring your own container) works but is the most effort. C throws away the trained model. D isn't a SageMaker endpoint and adds conversion work."
  },
  {
    "number": 394, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-approve.html",
    "question": "Auditors require a record of every model version and who approved it. The deployment pipeline must deploy ONLY approved versions, automatically. What should the ML engineer set up?",
    "options": {
      "A": "Turn on S3 versioning for model.tar.gz files and tag approved objects with approved=true.",
      "B": "Register each version in a SageMaker Model Registry model package group as PendingManualApproval. A reviewer changes the status to Approved, which starts CI/CD deployment.",
      "C": "Log each training run in SageMaker Experiments and deploy the run with the best metric.",
      "D": "Store model files in a Git repository and deploy from tagged commits."
    },
    "correct_answer": "B",
    "explanation": "The Model Registry gives every version an approval status. AWS: changing 'PendingManualApproval to Approved' starts CI/CD deployment for that version, and changing 'Approved to Rejected' redeploys the latest version that's still Approved. That's both the audit trail and the gate. A and D are homemade versions with no built-in approval workflow. C picks the best metric automatically, with no human approval step."
  },
  {
    "number": 395, "domain": 2, "task": "2.2", "concept": true,
    "question": "A general-purpose LLM was fully fine-tuned on legal contracts for several epochs at a high learning rate. It now handles contracts well but fails at basic general questions it used to answer. What is happening, and what is the BEST fix?",
    "options": {
      "A": "Underfitting. Train for more epochs on the legal data.",
      "B": "Overfitting to the validation set. Use a bigger validation set.",
      "C": "Catastrophic forgetting. Use parameter-efficient fine-tuning (such as LoRA) or a lower learning rate, and mix some general-domain examples into the fine-tuning data.",
      "D": "Data leakage. Remove duplicate contracts."
    },
    "correct_answer": "C",
    "explanation": "Catastrophic forgetting happens when new training overwrites what the model already knew. It's like cramming for one exam so hard that you forget how to do basic math. The fixes: change fewer weights (PEFT/LoRA, frozen layers), take gentler steps (a lower learning rate), and keep showing the model some of the old material (mixed data). A makes forgetting worse. B and D describe other problems. The C01 guide lists catastrophic forgetting under Task 2.2. (Standard ML concept.)"
  },
  {
    "number": 396, "domain": 2, "task": "2.2", "concept": true,
    "question": "A trained neural network is too large for an edge device's memory. The team needs to shrink it with minimal accuracy loss and without collecting new data. Which TWO techniques reduce model size? (Choose two.)",
    "options": {
      "A": "Quantize the weights from FP32 to INT8.",
      "B": "Add more layers and retrain.",
      "C": "Convert the weights from FP32 to FP64.",
      "D": "Prune weights with very small magnitudes and fine-tune briefly.",
      "E": "Increase the batch size used for inference."
    },
    "correct_answer": "AD",
    "explanation": "Quantization stores each weight in fewer bits (32-bit to 8-bit is about 4× smaller), like saving a photo at a slightly lower quality. Pruning removes connections that barely matter, then fine-tunes so the rest can compensate, like trimming dead branches. The C01 guide lists 'altering data types, pruning... compression' for reducing model size. B and C make the model bigger. E changes throughput, not the size of the model file. (Standard ML concept.)"
  },
  {
    "number": 397, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-early-stopping.html",
    "question": "A tuning job uses a custom PyTorch training script with early stopping set to AUTO, but no training job is ever stopped early, even clearly bad ones. What is the MOST likely cause?",
    "options": {
      "A": "Early stopping works only with the Grid search strategy.",
      "B": "The script doesn't compute and log the objective metric after each epoch, so SageMaker has nothing to compare during training.",
      "C": "MaxParallelTrainingJobs must be set to 1 for early stopping.",
      "D": "Early stopping works only with managed spot training."
    },
    "correct_answer": "B",
    "explanation": "AMT early stopping checks the objective metric after each epoch and stops a job that's worse than the median of earlier jobs at the same epoch. AWS: an algorithm 'must emit objective metrics for each epoch', and for PyTorch 'there is no high-level support. You must explicitly write your training code so that it computes objective metrics and writes them to logs after each epoch.' A, C and D are invented restrictions."
  },
  {
    "number": 398, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-use.html",
    "question": "A team fine-tuned a foundation model in Amazon Bedrock. How can the application send requests to the CUSTOM model?",
    "options": {
      "A": "Call InvokeModel with the base model's ID. Bedrock automatically routes requests to the newest custom version.",
      "B": "Create a Bedrock knowledge base that points to the custom model.",
      "C": "Purchase Provisioned Throughput for the custom model, or deploy it as a custom model deployment for on-demand inference, and invoke that ARN.",
      "D": "Copy the custom model into an AWS Lambda layer and call it from Lambda."
    },
    "correct_answer": "C",
    "explanation": "AWS lists two ways to run inference on a custom model: buy Provisioned Throughput (dedicated capacity), or create a custom model deployment for on-demand use, paying only for what you use. Either way you call the custom model's ARN. A calls the original, un-tuned model. B is for RAG over documents; it doesn't host models. D isn't how Bedrock models are served."
  },
  {
    "number": 399, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html",
    "question": "A company has 5,000 labeled prompt–response pairs that show exactly the tone and format it wants. It wants a Bedrock model to produce outputs like these consistently. Which customization method fits BEST?",
    "options": {
      "A": "Reinforcement fine-tuning with a reward function in AWS Lambda.",
      "B": "Distillation from a larger teacher model.",
      "C": "A knowledge base for Retrieval Augmented Generation (RAG).",
      "D": "Supervised fine-tuning on the labeled pairs."
    },
    "correct_answer": "D",
    "explanation": "AWS: supervised fine-tuning means you 'provide labeled data... the model learns to associate what types of outputs should be generated for certain types of inputs.' Labeled input–output pairs are exactly what it needs. A is for when you can score responses with reward functions instead of providing example answers. B transfers a big model's skill into a smaller model; the goal here is a style, not a smaller model. C adds facts at query time but doesn't teach a consistent tone or format."
  },
  // ---------- Domain 2 · Task 2.2 / 2.3 Analyze model performance ----------
  {
    "number": 400, "domain": 2, "task": "2.3", "concept": true,
    "question": "On 1,000 test cases, a fraud classifier produces TP = 80, FN = 20, FP = 40 and TN = 860. What are its precision and recall?",
    "options": {
      "A": "Precision ≈ 0.67, recall = 0.80",
      "B": "Precision = 0.80, recall ≈ 0.67",
      "C": "Precision = 0.94, recall = 0.80",
      "D": "Precision ≈ 0.67, recall = 0.94"
    },
    "correct_answer": "A",
    "explanation": "Precision = TP / (TP + FP) = 80/120 ≈ 0.67: of everything flagged, how much was really fraud. Recall = TP / (TP + FN) = 80/100 = 0.80: of all real fraud, how much was caught. 0.94 is accuracy ((80+860)/1,000), a common trap. B swaps the two. Memory trick: Precision = 'Pure?' (of what you flagged); Recall = 'Rounded up?' (of what really exists). F1 here ≈ 0.73. (Standard ML concept.)"
  },
  {
    "number": 401, "domain": 2, "task": "2.3", "concept": true,
    "question": "Each fraud case a model misses costs $5,000. Each false alarm costs a 2-minute analyst review. Which metric should the team prioritize when choosing between models?",
    "options": {
      "A": "Precision",
      "B": "Recall",
      "C": "Accuracy",
      "D": "Specificity"
    },
    "correct_answer": "B",
    "explanation": "Missed fraud (a false negative) is the expensive mistake, and recall measures how many real fraud cases you catch. False alarms are cheap, so lower precision is an acceptable price. Think of a smoke detector: you'd rather it go off for burnt toast than stay quiet during a fire. C is misleading when fraud is rare. D measures how well the model clears legitimate transactions, which is the cheap side here. (Standard ML concept.)"
  },
  {
    "number": 402, "domain": 2, "task": "2.3", "concept": true,
    "question": "A deployed binary classifier outputs probabilities and uses a 0.5 threshold. The business says there are too many false positives and accepts catching slightly fewer true positives. What is the FASTEST change that doesn't require retraining?",
    "options": {
      "A": "Lower the decision threshold to 0.3.",
      "B": "Retrain the model for more epochs.",
      "C": "Raise the decision threshold, for example to 0.7.",
      "D": "Change the evaluation metric to RMSE."
    },
    "correct_answer": "C",
    "explanation": "A higher threshold means the model must be more confident before it says 'yes'. That gives fewer false positives (higher precision) and catches somewhat fewer positives (lower recall), which is exactly the trade the business accepted. It's like raising the bar for a job offer. A does the opposite. B requires retraining. D is a regression metric, so it doesn't fit a classifier. (Standard ML concept.)"
  },
  {
    "number": 403, "domain": 2, "task": "2.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/xgboost-tuning.html",
    "question": "A house-price regression model will be judged on its 'typical error in dollars'. A few mansions in the data have huge errors, and stakeholders don't want those few homes to dominate the metric. Which XGBoost validation metric fits BEST?",
    "options": {
      "A": "validation:rmse",
      "B": "validation:auc",
      "C": "validation:accuracy",
      "D": "validation:mae"
    },
    "correct_answer": "D",
    "explanation": "MAE (mean absolute error) averages the dollar errors directly, so a $1M miss counts 10× a $100k miss. RMSE (A) squares errors before averaging, so that $1M miss counts 100×, and a few mansions dominate. Squaring punishes big misses, which is useful when big misses are what you fear most, but not here. B and C are classification metrics."
  },
  {
    "number": 404, "domain": 2, "task": "2.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-rules.html",
    "question": "During training, training loss keeps falling every epoch. Validation loss falls until epoch 15 and then rises steadily. What is happening, and which response fits BEST?",
    "options": {
      "A": "Overfitting (overtraining). Stop around epoch 15 with early stopping and/or add regularization.",
      "B": "Underfitting. Add more layers.",
      "C": "Vanishing gradients. Switch the activation function.",
      "D": "The learning rate is too low. Increase it tenfold."
    },
    "correct_answer": "A",
    "explanation": "When training keeps improving while validation gets worse, the model is memorizing the training data instead of learning general patterns. That's overfitting. Debugger has an Overtraining rule for this pattern: 'validation loss starts increasing, because the model starts overfitting.' The fixes are to stop at the best epoch or add regularization. B would show both losses staying high. C would show the loss barely moving. D would also show slow progress on both curves, not this split."
  },
  {
    "number": 405, "domain": 2, "task": "2.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/debugger-built-in-actions.html",
    "question": "A deep learning training job sometimes produces NaN loss after a few hundred steps and then wastes hours of GPU time. The team wants SageMaker to detect this automatically and stop the job. What should they configure?",
    "options": {
      "A": "The Debugger VanishingGradient rule with an Email action.",
      "B": "The Debugger ExplodingTensor rule with the StopTraining built-in action.",
      "C": "The Debugger Overfit rule with an SMS action.",
      "D": "A SageMaker Model Monitor model quality schedule."
    },
    "correct_answer": "B",
    "explanation": "AWS: ExplodingTensor 'detects whether the tensors emitted during training have non-finite values, either infinite or NaN.' The built-in action rule_configs.StopTraining() 'stops a training job when the Debugger rule finds an issue.' Together they detect the problem and save the wasted hours. A looks for tiny gradients, not NaN, and only sends an email. C compares training and validation loss. D monitors deployed endpoints, not training. (Note: built-in actions can't be used on jobs with spot interruptions.)"
  },
  {
    "number": 406, "domain": 2, "task": "2.3", "concept": true,
    "question": "Debugger's VanishingGradient rule fires on a 40-layer network that uses sigmoid activations. The early layers barely learn. Which change is MOST likely to help?",
    "options": {
      "A": "Add 20 more sigmoid layers.",
      "B": "Lower the learning rate to 1e-7.",
      "C": "Switch the hidden layers to ReLU activations and add batch normalization or residual connections.",
      "D": "Remove the validation set."
    },
    "correct_answer": "C",
    "explanation": "Sigmoid gradients are at most 0.25. Multiplied through dozens of layers they shrink toward zero, so the early layers get almost no learning signal (Debugger flags this when gradients drop 'below a specified threshold'). It's like a game of telephone through 40 people: the message fades. ReLU keeps gradients from shrinking for positive inputs, and batch norm and skip connections help the signal flow. A makes the chain longer. B makes updates even smaller. D is unrelated. (Standard deep learning concept, plus the Debugger rule definition.)"
  },
  {
    "number": 407, "domain": 2, "task": "2.3", "concept": true,
    "question": "Before investing in a complex deep learning model for churn, a manager asks how the team will prove that the new model is actually better. What should the team do FIRST?",
    "options": {
      "A": "Train the deep model and report its accuracy.",
      "B": "Use the accuracy reported in a public paper as the target.",
      "C": "Compare the deep model's training loss with its validation loss.",
      "D": "Set up a performance baseline, such as a majority-class predictor and a simple logistic regression, on the same validation data and metric."
    },
    "correct_answer": "D",
    "explanation": "A baseline is the score to beat. If 95% of customers don't churn, a model that always says 'no churn' already gets 95% accuracy, so a fancy model's 95% means nothing. A simple model on the same data and metric shows whether the extra complexity is worth it. A has nothing to compare against. B uses different data. C checks for overfitting, not whether the model adds value. The C01 guide lists 'methods to create performance baselines' under Task 2.3. (Standard ML concept.)"
  },
  {
    "number": 408, "domain": 2, "task": "2.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateTrainingJob.html",
    "question": "A team runs hundreds of training jobs with different data versions and hyperparameters. Months later, auditors ask them to reproduce the exact run behind the production model. Which approach BEST supports reproducible experiments on AWS?",
    "options": {
      "A": "Track every training job's parameters, input data locations, metrics and artifacts with SageMaker AI managed MLflow (for example, through the training job's MlflowConfig).",
      "B": "Rely on Amazon CloudWatch Logs from each training job.",
      "C": "Name S3 folders after the date of each run.",
      "D": "Use AWS CloudTrail to see who called CreateTrainingJob."
    },
    "correct_answer": "A",
    "explanation": "Experiment tracking records the full recipe of each run (parameters, data versions, metrics, artifacts) in one place you can search and compare. CreateTrainingJob supports an MlflowConfig for 'SageMaker managed MLflow'. B holds logs, but nothing ties them together into a run's recipe. C is a naming habit, not tracking. D shows who made API calls, not which parameters and data went in."
  },
  {
    "number": 409, "domain": 2, "task": "2.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-post-training-bias-metric-di.html",
    "question": "After training, SageMaker Clarify reports disparate impact (DI) = 0.8 for a loan model. Facet a is applicants aged 30–50, and facet d is all other ages. How should this be interpreted?",
    "options": {
      "A": "The model is 80% accurate for facet d.",
      "B": "Facet d is predicted to be approved at 80% of the rate of facet a, so facet a is favored.",
      "C": "Facet d is favored, because DI is greater than 0.5.",
      "D": "The training labels have a 0.8 difference in approval rates."
    },
    "correct_answer": "B",
    "explanation": "DI = q'd / q'a, the ratio of POSITIVE PREDICTION rates. AWS's example: approving 50% of facet d and 60% of facet a gives DI ≈ 0.8. Values below 1 mean facet a gets positive predictions more often (AWS calls this 'positive bias'); 1 means parity; above 1 means facet d is favored. A confuses DI with accuracy. C misreads the scale, because parity is 1, not 0.5. D describes DPL, a pre-training metric based on labels."
  },
  {
    "number": 410, "domain": 2, "task": "2.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/APIReference/API_CreateInferenceExperiment.html",
    "question": "An ML engineer is running a SageMaker AI shadow test. Besides latency and errors, they must compare the shadow variant's PREDICTIONS with the production variant's predictions on the same requests. What should they configure?",
    "options": {
      "A": "Look only at the ModelLatency and Invocation5XXErrors CloudWatch metrics for each variant.",
      "B": "Change the shadow variant to a production variant with a 10% weight.",
      "C": "Set DataStorageConfig on the inference experiment so that request and response data is captured to Amazon S3, then compare both variants' outputs offline.",
      "D": "Use Amazon Inspector on the endpoint."
    },
    "correct_answer": "C",
    "explanation": "CreateInferenceExperiment's DataStorageConfig sets 'the Amazon S3 location and configuration for storing inference request and response data.' With both variants' responses captured for the same requests, you can compare predictions side by side, and users still see only production's answers. A covers operational health only, not prediction quality. B is an A/B test that shows the new model's answers to 10% of real users. D scans for software vulnerabilities."
  },
  {
    "number": 411, "domain": 2, "task": "2.3",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-shapley-values.html",
    "question": "Executives want to know which features matter most to a credit model OVERALL. Customer service needs to tell ONE specific customer why their score was low. What can SageMaker Clarify provide?",
    "options": {
      "A": "Only global feature importance. Per-customer explanations need a different tool.",
      "B": "Only per-prediction explanations. Overall importance needs Debugger.",
      "C": "Bias metrics such as DPL, which answer both questions.",
      "D": "SHAP feature attributions, both globally (across the model) and locally (for a specific prediction)."
    },
    "correct_answer": "D",
    "explanation": "AWS: Shapley-based attributions 'can be provided for specific predictions and at a global level for the model as a whole.' Local SHAP values explain one customer's score, and aggregated SHAP values rank features for the whole model. A and B each name only half of what Clarify does. C measures fairness between groups, not which features drove a score."
  },
  {
    "number": 412, "domain": 2, "task": "2.3", "concept": true,
    "question": "A 10-class product image classifier has 91% overall accuracy, but customers complain that 'sneakers' and 'running shoes' are often swapped. Which evaluation tool BEST shows which classes are confused with each other?",
    "options": {
      "A": "A confusion matrix, shown as a heat map of actual vs predicted classes.",
      "B": "The overall accuracy broken down by month.",
      "C": "RMSE for each class.",
      "D": "A single ROC curve for the whole model."
    },
    "correct_answer": "A",
    "explanation": "A multiclass confusion matrix has a row for each true class and a column for each predicted class. Bright cells off the diagonal (the heat map) show exactly which pairs get swapped, for example many 'sneakers' predicted as 'running shoes'. The C01 guide lists 'confusion matrix, heat maps' under Task 2.3. B is still a single overall number. C is a regression metric. D is for binary decisions and doesn't show which pairs of classes are confused. (Standard ML concept.)"
  },
  {
    "number": 413, "domain": 2, "task": "2.2",
    "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/distributed-training.html",
    "question": "A data-parallel training job uses 2 instances with 4 GPUs each. The per-replica batch size is 64, and the training set has 51,200 samples. How many iterations (steps) make up one epoch?",
    "options": {
      "A": "800",
      "B": "100",
      "C": "25",
      "D": "400"
    },
    "correct_answer": "B",
    "explanation": "There are 2 × 4 = 8 replicas. AWS: 'global batch size = (the number of model replicas) * (per-replica batch size)' = 8 × 64 = 512. Iterations per epoch = samples ÷ global batch = 51,200 ÷ 512 = 100. AWS's own example: 5,000 samples with a global batch of 500 is 10 iterations. A uses the per-replica batch alone (51,200 ÷ 64). C and D come from miscounting the replicas."
  }
].map(q => ({ topic: "Topic 6 - C01 Domains 1-2 Hard Set", origin: "written-c01", c01: true, hard: true, ...q })));
