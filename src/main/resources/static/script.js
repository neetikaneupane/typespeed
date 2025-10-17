const typingArea = document.getElementById('typing-text');
const hiddenInput = document.getElementById('hidden-input');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timeDisplay = document.getElementById('time');
const progressBar = document.getElementById('progress');
const resetBtn = document.getElementById('reset-btn');
const difficultySelect = document.getElementById('difficulty');
const timeSelect = document.getElementById('time-select');

let timeLimit = parseInt(timeSelect.value);
let time = timeLimit;
let timer = null;
let started = false;
let currentIndex = 0;
let caretSpan = null;
let testCompleted = false;
let finalWpm = 0;
let finalAccuracy = 0;

const paragraphs = {
    easy: [
        "the quick brown fox jumps over the lazy dog this is a simple typing test that will help you practice your skills keep going and you will see improvement over time practice makes perfect in everything you do the more you type, the faster and more accurate you will become remember to focus on accuracy first, then speed will follow naturally stay focused and maintain a steady rhythm as you type each word carefully.",
        "learning to type well is an important skill in today's world many jobs require good typing abilities take your time and focus on building good habits from the start typing tests help you track your progress over time you can see your speed improve with each practice session stay motivated and keep practicing every day for best results consistency is the key to becoming a proficient typist.",
        "the key to success is consistent practice and patience do not rush through the exercises take breaks when you feel tired and come back refreshed building muscle memory takes time and dedication your fingers will learn the keyboard layout naturally focus on proper finger placement and posture good habits formed early will benefit you for years to come.",
        "reading books helps expand your vocabulary and knowledge the more you read, the more words you will encounter this diversity strengthens your typing ability over time different genres offer unique writing styles to practice fiction and non-fiction each present their own challenges technical writing requires precision and accuracy literary works flow with rhythm and creative expression.",
        "setting small goals helps you stay motivated during practice celebrate each milestone you achieve along the way track your words per minute to see tangible progress accuracy is more important than raw speed at first speed will naturally increase as you build confidence don't get discouraged by mistakes or slow starts every expert was once a beginner just like you."
    ],
    medium: [
        "JavaScript is a versatile programming language used for web development. It allows developers to create dynamic and interactive websites. Modern applications rely heavily on JavaScript frameworks and libraries to function efficiently. Functions are fundamental building blocks in programming. They help organize code into reusable pieces that can be called multiple times. Understanding functions is essential for writing clean and maintainable code in any language. Mastering these concepts takes practice and dedication to the craft.",
        "Variables store data that can be accessed and modified throughout your program. Choosing descriptive variable names makes your code easier to understand. Good naming conventions are crucial for collaborative development projects. Arrays and objects are essential data structures in JavaScript. They allow you to store and manipulate collections of data efficiently. Mastering these concepts will significantly improve your programming capabilities and problem-solving skills. Software development requires continuous learning and adaptation to new technologies.",
        "Practice coding challenges regularly to sharpen your skills. The more problems you solve, the better you become at recognizing patterns. Challenge yourself with increasingly difficult tasks to accelerate your learning journey. Algorithm design requires logical thinking and creativity. Breaking down complex problems into smaller steps makes them manageable. Testing your code thoroughly prevents bugs from reaching production. Code reviews help you learn from experienced developers.",
        "Web developers need to understand both frontend and backend technologies. The frontend handles what users see and interact with directly. The backend manages data storage and business logic behind the scenes. Databases store information that applications need to function properly. APIs connect different systems and allow them to communicate effectively. Security considerations must be built into every layer of the application. Performance optimization ensures users have a smooth experience.",
        "Version control systems help teams collaborate on code projects. Git has become the industry standard for tracking changes. Branches allow developers to work on features independently. Merge conflicts occur when multiple people edit the same files. Pull requests facilitate code review before merging changes. Continuous integration automates testing and deployment processes. DevOps practices bridge the gap between development and operations teams."
    ],
    hard: [
        "Asynchronous programming paradigms facilitate concurrent operations without blocking execution threads. Understanding the event loop mechanism is quintessential for developing sophisticated applications that require optimal performance and responsiveness. The juxtaposition of various algorithmic approaches reveals the inherent complexity of computational problems. Ephemeral data structures provide temporary storage solutions while maintaining efficiency. Obfuscation techniques often obscure the underlying implementation details from casual observation. Comprehensive documentation becomes increasingly important as system complexity grows. Maintaining code quality requires discipline and adherence to established conventions.",
        "Heterogeneous systems present unique challenges in distributed computing environments. The quintessence of robust architecture lies in anticipating failure modes and implementing comprehensive error handling strategies throughout the application lifecycle. Synthesis of disparate methodologies enables innovative solutions to intractable problems. Ubiquitous connectivity has fundamentally transformed how we approach software design and implementation. The dichotomy between theoretical elegance and practical implementation remains ever-present in software engineering. Scalability concerns must be addressed from the initial design phase. Performance bottlenecks often emerge unexpectedly in production environments.",
        "Paradigm shifts in technology necessitate continuous adaptation and learning throughout your career. Quintessential principles of computer science transcend specific languages or frameworks and remain relevant. Understanding fundamental concepts provides a solid foundation for tackling any technical challenge that arises. Microservices architecture decomposes monolithic applications into smaller, manageable components that can scale independently. Containerization technologies enable consistent deployment across different environments and platforms. Orchestration tools automate the management of complex distributed systems at scale. Cloud computing has revolutionized infrastructure provisioning and resource allocation.",
        "Cryptographic algorithms ensure data confidentiality and integrity across untrusted networks and storage systems. Hash functions create unique fingerprints for data verification and password storage purposes. Public key infrastructure enables secure communication between parties without prior key exchange. Blockchain technology leverages cryptographic principles to create immutable distributed ledgers for transactions. Consensus mechanisms ensure agreement among distributed nodes in decentralized networks without central authority. Smart contracts execute automatically when predetermined conditions are met on the blockchain. Decentralization introduces new paradigms for building trustless systems and applications.",
        "Machine learning algorithms discover patterns in data without explicit programming instructions or rules. Neural networks model complex relationships through interconnected layers of artificial neurons that process information. Deep learning architectures extract hierarchical features from raw data automatically through training processes. Natural language processing enables computers to understand and generate human language effectively. Computer vision systems interpret visual information from images and video streams with remarkable accuracy. Reinforcement learning agents learn optimal strategies through trial and error interactions with environments. Transfer learning leverages knowledge from one domain to accelerate learning in related domains."
    ]
};

function getRandomParagraph(level) {
    const list = paragraphs[level];
    return list[Math.floor(Math.random() * list.length)];
}

function renderParagraph(text) {
    typingArea.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('char');
        typingArea.appendChild(span);
    });

    caretSpan = document.createElement('span');
    caretSpan.classList.add('caret');
    typingArea.insertBefore(caretSpan, typingArea.firstChild);
}

function moveCaret(position) {
    const chars = typingArea.querySelectorAll('.char');
    if (position >= chars.length) {
        typingArea.appendChild(caretSpan);
    } else {
        typingArea.insertBefore(caretSpan, chars[position]);
    }
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeDisplay.textContent = `${time}s`;
        progressBar.style.width = `${(time / timeLimit) * 100}%`;
        if (time <= 0) {
            clearInterval(timer);
            hiddenInput.disabled = true;
            finishTest();
        }
    }, 1000);
}

async function finishTest() {
    if (testCompleted) return;
    testCompleted = true;

    const difficulty = difficultySelect.value;
    const duration = timeLimit;

    try {
        await saveTestResult(finalWpm, finalAccuracy, difficulty, duration);
        console.log('Test result saved successfully!');

        if (typeof loadBestScores === 'function') {
            setTimeout(() => loadBestScores(), 500);
        }
    } catch (error) {
        console.error('Failed to save test result:', error);
    }
}

function updateTyping(inputValue) {
    const characters = typingArea.querySelectorAll('span.char');
    let correctCount = 0;

    for (let i = 0; i < characters.length; i++) {
        const charSpan = characters[i];
        const typedChar = inputValue[i];

        if (typedChar == null) {
            charSpan.classList.remove('correct', 'incorrect');
        } else if (typedChar === charSpan.textContent) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
            correctCount++;
        } else {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
        }
    }

    moveCaret(inputValue.length);

    const accuracy = inputValue.length > 0 ? (correctCount / inputValue.length) * 100 : 100;
    accuracyDisplay.textContent = `${accuracy.toFixed(0)}%`;
    finalAccuracy = accuracy;

    const wordsTyped = inputValue.trim().split(/\s+/).filter(w => w.length > 0).length;
    const elapsed = timeLimit - time;
    const wpm = elapsed > 0 ? (wordsTyped / elapsed) * 60 : 0;
    wpmDisplay.textContent = Math.round(wpm);
    finalWpm = Math.round(wpm);
}

hiddenInput.addEventListener('input', (e) => {
    if (!started) {
        startTimer();
        started = true;
    }
    updateTyping(e.target.value);
});

typingArea.addEventListener('click', () => {
    hiddenInput.focus();
});

resetBtn.addEventListener('click', resetTest);

function resetTest() {
    clearInterval(timer);
    timeLimit = parseInt(timeSelect.value);
    time = timeLimit;
    started = false;
    testCompleted = false;
    finalWpm = 0;
    finalAccuracy = 0;
    hiddenInput.disabled = false;
    hiddenInput.value = '';
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timeDisplay.textContent = `${timeLimit}s`;
    progressBar.style.width = '100%';
    const level = difficultySelect.value;
    const newParagraph = getRandomParagraph(level);
    renderParagraph(newParagraph);
}

difficultySelect.addEventListener('change', resetTest);
timeSelect.addEventListener('change', resetTest);

resetTest();