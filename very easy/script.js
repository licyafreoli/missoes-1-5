document.addEventListener('DOMContentLoaded', () => {

    const addGrade = () => {
        const name = document.getElementById('studentName').value.trim();
        const classGroup = document.getElementById('classGroup').value.trim();
        const grade = parseFloat(document.getElementById('studentGrade').value);
        if (name && classGroup && !isNaN(grade)) {
            const students = JSON.parse(localStorage.getItem('students') || '[]');
            const studentIndex = students.findIndex(s => s.name === name && s.classGroup === classGroup);
            if (studentIndex > -1) {
                students[studentIndex].grades.push(grade);
            } else {
                students.push({ name, classGroup, grades: [grade] });
            }
            localStorage.setItem('students', JSON.stringify(students));
            updateResults();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const finalizeRegistration = () => {
        const name = document.getElementById('studentName').value.trim();
        const classGroup = document.getElementById('classGroup').value.trim();
        if (name && classGroup) {
            const students = JSON.parse(localStorage.getItem('students') || '[]');
            students.push({ name, classGroup, grades: [] });
            localStorage.setItem('students', JSON.stringify(students));
            updateResults();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const updateResults = () => {
        const resultsContainer = document.getElementById('studentResults');
        const students = JSON.parse(localStorage.getItem('students') || '[]');

        const searchQuery = document.getElementById('searchBox').value.trim().toLowerCase();

        const filteredStudents = students.filter(student => 
            student.name && student.name.toLowerCase().includes(searchQuery) ||
            student.classGroup && student.classGroup.toLowerCase().includes(searchQuery)
        );

        resultsContainer.innerHTML = filteredStudents.map(student => {
            const average = student.grades.length ? (student.grades.reduce((a, b) => a + b) / student.grades.length).toFixed(2) : 'Não Informada';
            return `<div>Nome: ${student.name}, Turma: ${student.classGroup}, Média: ${average}</div>`;
        }).join('');
    };

    document.getElementById('addGradeBtn').addEventListener('click', addGrade);
    document.getElementById('completeRegistrationBtn').addEventListener('click', finalizeRegistration);
    document.getElementById('searchBox').addEventListener('input', updateResults);

    updateResults();

    const createChunks = (number) => {
        return Array(number).fill('chunk').join('-');
    };

    document.getElementById('generateChunksBtn').addEventListener('click', () => {
        const number = parseInt(document.getElementById('chunkNumber').value);
        document.getElementById('chunksResult').textContent = `Resultado: ${createChunks(number)}`;
    });

    const reverseArray = (array) => {
        let newArray = [];
        for (let i = array.length - 1; i >= 0; i--) {
            newArray[newArray.length] = array[i];
        }
        return newArray;
    };

    document.getElementById('reverseArrayBtn').addEventListener('click', () => {
        const arrayInput = document.getElementById('arrayInputField').value.split(',').map(Number);
        document.getElementById('arrayResult').textContent = `Resultado: ${reverseArray(arrayInput).join(', ')}`;
    });

    const calculateDigitSquare = (number) => {
        return Array.from(String(number), digit => Math.pow(Number(digit), 2)).join('');
    };

    document.getElementById('calculateDigitSquareBtn').addEventListener('click', () => {
        const digitNumber = document.getElementById('digitNumber').value;
        document.getElementById('digitSquareResult').textContent = `Resultado: ${calculateDigitSquare(digitNumber)}`;
    });

    const findMaxLetter = (str) => {
        let maxLetter = '';
        for (let i = 0; i < str.length; i++) {
            let letter = str[i].toLowerCase();
            if (letter > maxLetter) {
                maxLetter = letter;
            }
        }
        return maxLetter;
    };

    document.getElementById('findMaxLetterBtn').addEventListener('click', () => {
        const stringInput = document.getElementById('stringInputField').value;
        document.getElementById('maxLetterResult').textContent = `Maior Letra: ${findMaxLetter(stringInput)}`;
    });

    const reverseWords = (str) => {
        return str
            .split(' ')
            .map(word => word.toLowerCase().split('').reverse().join(''))
            .join(' ');
    };

    document.getElementById('reverseWordsBtn').addEventListener('click', () => {
        const wordsInput = document.getElementById('wordsInputField').value;
        document.getElementById('wordReverseResult').textContent = `Resultado: ${reverseWords(wordsInput)}`;
    });
});
