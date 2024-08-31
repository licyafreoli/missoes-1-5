document.addEventListener("DOMContentLoaded", function () {

    function flattenAndSortArray(arr) {
        return arr.flat().sort((a, b) => a - b);
    }
    
    document.getElementById('sortArrayBtn').addEventListener('click', function () {
        const input = document.getElementById('arrayInput').value;
        try {
            const array = JSON.parse(input);
            if (!Array.isArray(array) || !array.every(subArray => Array.isArray(subArray))) {
                throw new Error('Por favor, insira um array bidimensional válido.');
            }
            const sortedArray = flattenAndSortArray(array);
            document.getElementById('sortedOutput').innerText = `Saída: [${sortedArray.join(', ')}]`;
        } catch (e) {
            document.getElementById('sortedOutput').innerText = 'Erro: ' + e.message;
        }
    });

    function abbreviateName(fullName) {
        const names = fullName.trim().split(' ');
        if (names.length < 2) return 'Nome completo inválido';

        const lastName = names.pop().toUpperCase();
        const abbreviatedNames = names.map(name => name.charAt(0).toUpperCase() + '.');
        
        return `${lastName}, ${abbreviatedNames.join(' ')}`;
    }
    
    document.getElementById('processNameBtn').addEventListener('click', function () {
        const input = document.getElementById('nameInput').value;
        const result = abbreviateName(input);
        document.getElementById('nameOutput').innerText = `Resultado: ${result}`;
    });

    function hasEqualLetterCount(str) {
        const sanitizedStr = str.replace(/\s+/g, '').toLowerCase();
        const letterCounts = {};

        for (const char of sanitizedStr) {
            letterCounts[char] = (letterCounts[char] || 0) + 1;
        }

        const counts = Object.values(letterCounts);
        return counts.every(count => count === counts[0]);
    }
    
    document.getElementById('checkLettersBtn').addEventListener('click', function () {
        const input = document.getElementById('stringInput').value;
        const result = hasEqualLetterCount(input);
        document.getElementById('checkOutput').innerText = `Resultado: ${result}`;
    });

    function factorial(n) {
        if (n === 0) return 1n;
        return BigInt(n) * factorial(n - 1);
    }
    
    document.getElementById('calculateFactorialBtn').addEventListener('click', function () {
        const input = parseInt(document.getElementById('numberInput').value, 10);
        if (isNaN(input) || input < 0) {
            document.getElementById('factorialOutput').innerText = 'Por favor, insira um número inteiro não negativo.';
        } else {
            const result = factorial(input);
            document.getElementById('factorialOutput').innerText = `Resultado: ${result}n`;
        }
    });

    function generateOrderedPairs(x, y) {
        const pairs = [];
    
        for (let i = 0; i <= x; i++) {
            for (let j = 0; j <= y; j++) {
                pairs.push([i, j]);
            }
        }
    
        return pairs;
    }
    
    document.getElementById('generatePairsBtn').addEventListener('click', function () {
        const x = parseInt(document.getElementById('xInput').value, 10);
        const y = parseInt(document.getElementById('yInput').value, 10);
    
        if (isNaN(x) || isNaN(y) || x < 0 || y < 0) {
            document.getElementById('pairsOutput').innerText = 'Por favor, insira valores inteiros não negativos para x e y.';
        } else {
            const result = generateOrderedPairs(x, y);
            document.getElementById('pairsOutput').innerText = `Resultado: ${JSON.stringify(result)}`;
        }
    });

    function calculateCoins(value) {
        const coins = [500, 100, 25, 10, 5, 1];
        const result = { '500': 0, '100': 0, '25': 0, '10': 0, '5': 0, '1': 0 };
    
        for (let coin of coins) {
            result[coin] = Math.floor(value / coin);
            value %= coin;
        }
    
        return result;
    }
    
    document.getElementById('countCoinsBtn').addEventListener('click', function () {
        const input = parseInt(document.getElementById('coinInput').value, 10);
    
        if (isNaN(input) || input < 0) {
            document.getElementById('coinOutput').innerText = 'Por favor, insira um valor inteiro não negativo.';
        } else {
            const result = calculateCoins(input);
            document.getElementById('coinOutput').innerText = `Resultado: ${JSON.stringify(result)}`;
        }
    });

    function isValidIdentificationCode(code) {
        if (!/^\d+$/.test(code)) return false;
    
        const digits = code.split('').map(Number); 
        const length = digits.length;
    
        if (length < 2) return false; 
    
        let sumEven = 0; 
        let sumOdd = 0;  
    
        for (let i = 0; i < length - 1; i++) {
            if (i % 2 === 0) { 
                sumOdd += digits[i];
            } else { 
                sumEven += digits[i];
            }
        }
    
        const totalSum = (sumOdd * 3) + sumEven;
        const checkDigit = totalSum % 10 === 0 ? 0 : 10 - (totalSum % 10);
    
        return digits[length - 1] === checkDigit;
    }
    
    document.getElementById('validateIdBtn').addEventListener('click', function () {
        const input = document.getElementById('idCodeInput').value;
        const isValid = isValidIdentificationCode(input);
        document.getElementById('idValidationResult').innerText = isValid ? 'Código válido' : 'Código inválido';
    });

});

class LicencaVoo {
    constructor(nome, sobrenome, dataNascimento) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = new Date(dataNascimento);
        this.licenca = false;
    }

    criarLicenca() {
        if (this.licenca) {
            return 'Licença já criada.';
        }

        const sobrenomeFormatado = this.sobrenome.toUpperCase().padEnd(5, '9').slice(0, 5);
        const anoNascimento = this.dataNascimento.getFullYear();
        const mesNascimento = String(this.dataNascimento.getMonth() + 1).padStart(2, '0');
        const ultimoDigitoAno = String(anoNascimento).slice(-1);
        const algarismoDecada = String(anoNascimento).charAt(2);
        const primeiraLetraNome = this.nome.charAt(0).toLowerCase();

        this.licenca = `${sobrenomeFormatado}-${algarismoDecada}${mesNascimento}${ultimoDigitoAno}.${primeiraLetraNome}`;
        return this.licenca;
    }
}

document.getElementById('generateLicenseBtn').addEventListener('click', function () {
    const nome = document.getElementById('nomeInput').value.trim();
    const sobrenome = document.getElementById('sobrenomeInput').value.trim();
    const dataNascimento = document.getElementById('dataNascimentoInput').value;

    if (!nome || !sobrenome || !dataNascimento) {
        document.getElementById('licenseOutput').innerText = 'Por favor, preencha todos os campos.';
        return;
    }

    const pessoa = new LicencaVoo(nome, sobrenome, dataNascimento);
    const licenca = pessoa.criarLicenca();
    document.getElementById('licenseOutput').innerText = `Licença Gerada: ${licenca}`;
});