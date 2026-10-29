# AWS Solutions Architect Exam Simulator

A professional exam simulator built to replicate the PearsonVUE testing experience for AWS Solutions Architect practice exams.

## 🎯 Features

### Core Functionality
- **Timer Management**: Configurable countdown timer (15-130 minutes or unlimited)
- **Question Navigation**: Easy navigation between questions with a visual grid
- **Mark for Review**: Flag questions for later review
- **Progress Tracking**: Real-time progress bar showing completion status
- **Multiple Question Types**: Support for single-select and multi-select questions
- **Randomization**: Option to randomize questions and answer choices
- **Review Screen**: Comprehensive review before final submission
- **Detailed Results**: Question-by-question breakdown with correct answers

### User Interface
- Clean, modern design similar to professional testing platforms
- Responsive layout that works on desktop and tablet devices
- Visual question status indicators:
  - 🔵 Current question (blue)
  - 🟢 Answered (green)
  - 🟠 Marked for review (orange)
  - ⚪ Not answered (white)

### Exam Configuration
- **Question Count Options**:
  - 10 Questions (Quick Test)
  - 25 Questions (Practice)
  - 50 Questions (Half Exam)
  - 65 Questions (Full Exam - Default)
  - All Questions (640+ questions)

- **Time Limit Options**:
  - 15 minutes
  - 30 minutes
  - 60 minutes
  - 90 minutes
  - 130 minutes (Full exam - Default)
  - No time limit

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- All three files must be in the same directory:
  - `exam_simulator.html` - The main exam application
  - `exam_data.js` - The exam questions (JavaScript format)
  - `sa_exam.json` - The original exam questions (JSON format, for reference)

## ⚠️ CORS Issue Solution

**Problem**: Browsers block loading JSON files when opening HTML files directly from your file system (`file://` protocol) due to CORS (Cross-Origin Resource Sharing) security policies.

**Solution**: The exam data has been converted to a JavaScript file (`exam_data.js`) which can be loaded without CORS restrictions. This file is automatically loaded when you open the HTML file.

## 🚀 How to Use

### Starting the Exam
1. Open `exam_simulator.html` in your web browser
2. Review the exam information on the welcome screen
3. Configure your exam settings:
   - Select number of questions
   - Choose time limit
   - Enable/disable randomization options
4. Click "Begin Exam" to start

### During the Exam
- **Answering Questions**: Click on answer options to select them
- **Navigation**: 
  - Use "Previous" and "Next" buttons
  - Click question numbers in the sidebar to jump to specific questions
- **Mark for Review**: Check the "Mark for Review" box for questions you want to revisit
- **Progress**: Monitor your progress with the progress bar at the top
- **Timer**: Keep track of remaining time in the top-right corner

### Reviewing & Submitting
1. Click "Review & Submit" button in the sidebar
2. Review the exam summary showing:
   - Total questions
   - Answered questions
   - Unanswered questions
   - Marked for review
3. Click on any question to return and modify your answer
4. Click "Submit Exam" when ready to finish

### Results
After submission, you'll see:
- Overall score percentage
- Number of correct/incorrect/unanswered questions
- Time spent on the exam
- Detailed question-by-question breakdown
- Correct answers for each question

## 📊 Question Format

The simulator supports:
- **Single Select**: Questions with one correct answer (A, B, C, or D)
- **Multi Select**: Questions requiring multiple correct answers (e.g., "Choose two" or "Choose three")

## 🎨 Features Similar to PearsonVUE

1. **Professional Interface**: Clean, distraction-free design
2. **Timer Display**: Prominent countdown timer
3. **Question Navigator**: Grid view of all questions with status indicators
4. **Review Functionality**: Ability to mark and review questions before submission
5. **No Going Back**: Once submitted, exam cannot be retaken (refresh page for new exam)
6. **Progress Tracking**: Visual indicators of exam completion
7. **Secure Environment**: Answers not revealed until after submission

## 🔧 Customization

To customize the exam:
1. Edit `sa_exam.json` to add/modify questions
2. Modify time limits in the HTML file
3. Adjust color scheme in the CSS section
4. Change passing score criteria if needed

## 📱 Browser Compatibility

Tested and working on:
- Google Chrome (recommended)
- Mozilla Firefox
- Safari
- Microsoft Edge

## 💡 Tips for Best Experience

1. **Full Screen**: Use full-screen mode (F11) for distraction-free testing
2. **Stable Connection**: While the app works offline, ensure files are properly loaded
3. **Practice Mode**: Start with shorter exams (10-25 questions) to familiarize yourself
4. **Timed Practice**: Use the 130-minute option to simulate real exam conditions
5. **Review Wrong Answers**: After each exam, carefully review questions you got wrong

## 🔐 Privacy

- All data stays on your local computer
- No information is sent to external servers
- No tracking or analytics
- Answers are stored only in browser memory during the exam session

## 📝 Question Bank

The current question bank includes:
- **Topic**: AWS Solutions Architect Associate - Exam A
- **Total Questions**: 640+ questions
- **Coverage**: Comprehensive AWS services and architectural best practices

## 🛠️ Technical Details

- **Technology**: Pure HTML5, CSS3, and JavaScript
- **Dependencies**: None - completely standalone
- **File Size**: Lightweight and fast-loading
- **Data Format**: JSON for easy question management

## ❓ Troubleshooting

**Problem**: "Error loading exam data" or CORS error in console
- **Solution**: Make sure `exam_data.js` is in the same folder as `exam_simulator.html`
- **Alternative**: Run a local web server (see "Running with a Local Server" below)

**Problem**: Timer not working
- **Solution**: Check if JavaScript is enabled in your browser

**Problem**: Layout issues
- **Solution**: Try a different browser or clear browser cache

**Problem**: Questions show "undefined"
- **Solution**: Refresh the page and wait for data to fully load before clicking "Begin Exam"

### Running with a Local Server (Alternative Method)

If you prefer to use the original `sa_exam.json` file, you can run a simple local web server:

**Option 1 - Python (if installed):**
```bash
cd /Users/annabooker/Desktop/SA_exam
python3 -m http.server 8000
```
Then open: `http://localhost:8000/exam_simulator.html`

**Option 2 - Node.js (if installed):**
```bash
cd /Users/annabooker/Desktop/SA_exam
npx http-server -p 8000
```
Then open: `http://localhost:8000/exam_simulator.html`

**Option 3 - PHP (if installed):**
```bash
cd /Users/annabooker/Desktop/SA_exam
php -S localhost:8000
```
Then open: `http://localhost:8000/exam_simulator.html`

## 📈 Future Enhancements

Potential features for future versions:
- Score history tracking
- Explanation for correct answers
- Topic-based filtering
- Performance analytics by domain
- Export results to PDF
- Dark mode

## 📄 License

This exam simulator is for educational and practice purposes only.

---

**Good luck with your AWS Solutions Architect certification! 🎓**

