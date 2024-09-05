document.addEventListener('DOMContentLoaded', () => {
    // Corrida de Pods
    const startButton = document.getElementById('start-race');
    const raceResult = document.getElementById('race-result');
    const pods = document.querySelectorAll('.pod');

    startButton.addEventListener('click', () => {
        raceResult.textContent = '';
        pods.forEach(pod => pod.style.transform = 'translateX(0)');

        setTimeout(() => {
            pods.forEach(pod => {
                const distance = Math.floor(Math.random() * 500) + 100;
                pod.style.transform = `translateX(${distance}px)`;
            });
        }, 100);

        setTimeout(() => {
            const distances = Array.from(pods).map(pod => parseInt(pod.style.transform.replace('translateX(', '').replace('px)', '')));
            const maxDistance = Math.max(...distances);
            const winner = pods[distances.indexOf(maxDistance)].textContent;
            raceResult.textContent = `Vencedor: ${winner}`;
        }, 2000);
    });

    // Encontrar Conexões
    const findButton = document.getElementById('find-connections');
    const connectionData = JSON.parse(document.getElementById('connection-data').textContent);
    const connectionsResult = document.getElementById('connections-result');

    findButton.addEventListener('click', () => {
        const conexoes = encontrarConexoes(connectionData);
        connectionsResult.innerHTML = conexoes.length
            ? `<ul>${conexoes.map(conn => `<li>ID: ${conn._id}, Label: ${conn.label}</li>`).join('')}</ul>`
            : 'Nenhuma conexão encontrada.';
        connectionsResult.style.color = conexoes.length ? '#4CAF50' : '#ff5252';
    });

    function encontrarConexoes(obj) {
        const resultados = [];
        const explorar = (obj) => {
            if (obj && typeof obj === 'object') {
                if (obj.connection?._id && obj.connection?.label) {
                    resultados.push({
                        _id: obj.connection._id,
                        label: obj.connection.label
                    });
                }
                if (Array.isArray(obj.connections)) {
                    obj.connections.forEach(explorar);
                }
                Object.values(obj).forEach(explorar);
            }
        };
        explorar(obj);
        return resultados;
    }

    // Hora de Jogar
    class Explorador {
        constructor(nome) {
            this.nome = nome;
            this.nivel = 1;
            this.experiencia = 0;
            this.ranque = 'Novato';
            this.explorou = [];
        }

        explorar(planeta) {
            if (this.explorou.includes(planeta.id)) return { sucesso: false, mensagem: `Você já explorou o ${planeta.nome}.` };

            const dados = this.rolarDados();
            const sucesso = (planeta.hostilidade === 'pacifico' && dados >= 5) ||
                            (planeta.hostilidade === 'neutro' && dados >= 7) ||
                            (planeta.hostilidade === 'hostil' && dados >= 9);

            if (dados === 2 && planeta.hostilidade === 'hostil') {
                this.morrer();
                return { sucesso: false, mensagem: `${this.nome} morreu na exploração do ${planeta.nome}.` };
            }

            if (sucesso) {
                this.explorou.push(planeta.id);
                this.ganharExperiencia(planeta);
                return { sucesso: true, mensagem: `Exploração bem-sucedida no ${planeta.nome}! Você ganhou ${this.getPontosExperiencia(planeta.hostilidade)} pontos de experiência.` };
            } else {
                return { sucesso: false, mensagem: `Falha na exploração do ${planeta.nome}.` };
            }
        }

        rolarDados() {
            return Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
        }

        ganharExperiencia(planeta) {
            this.experiencia += this.getPontosExperiencia(planeta.hostilidade);
            this.atualizarNivel();
        }

        getPontosExperiencia(hostilidade) {
            return hostilidade === 'pacifico' ? 15 :
                   hostilidade === 'neutro' ? 20 :
                   hostilidade === 'hostil' ? 50 : 0;
        }

        atualizarNivel() {
            const nivelExperiencia = 100 + 10 * (this.nivel - 1);
            while (this.experiencia >= nivelExperiencia) {
                this.experiencia -= nivelExperiencia;
                this.nivel++;
                this.atualizarRanque();
            }
            this.atualizarInterface();
        }

        atualizarRanque() {
            this.ranque = this.nivel <= 9 ? 'Novato' :
                          this.nivel <= 29 ? 'Explorador' :
                          this.nivel <= 49 ? 'Veterano' :
                          this.nivel <= 79 ? 'Elite' :
                          this.nivel <= 98 ? 'Mestre' : 'Lenda';
        }

        morrer() {
            alert(`${this.nome} morreu na exploração espacial!`);
        }

        atualizarInterface() {
            document.getElementById('explorer-level').textContent = this.nivel;
            document.getElementById('explorer-experience').textContent = this.experiencia;
            document.getElementById('explorer-ranque').textContent = this.ranque;
        }
    }

    const explorador = new Explorador('John');

    document.getElementById('explore-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const planetaData = JSON.parse(document.getElementById('planet-select').value);
        const resultado = explorador.explorar(planetaData);
        const explorationResult = document.getElementById('exploration-result');
        explorationResult.textContent = resultado.mensagem;
        explorationResult.style.color = resultado.sucesso ? '#4CAF50' : '#ff5252';
    });

    // Otimização de Cálculos
    document.getElementById('calculate-fib').addEventListener('click', () => {
        const n = parseInt(document.getElementById('fibonacci-input').value);
        const fibResult = document.getElementById('fib-result');
        fibResult.textContent = `O ${n}º número de Fibonacci é: ${fibonacci(n)}`;
        fibResult.style.color = '#4CAF50';
    });

    function fibonacci(n) {
        if (n <= 1) return n;
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            const temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }

    // Registrar Voo
    const flightForm = document.getElementById('flight-registration');
    const registrationResult = document.getElementById('registration-result');

    flightForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const flightNumber = document.getElementById('flight-number').value;
        const destination = document.getElementById('destination').value;
        const passengerCount = document.getElementById('passenger-count').value;

        if (flightNumber && destination && passengerCount) {
            registrationResult.textContent = `Voo ${flightNumber} para ${destination} com ${passengerCount} passageiros registrado com sucesso!`;
            registrationResult.style.color = '#4CAF50';
        } else {
            registrationResult.textContent = 'Por favor, preencha todos os campos corretamente.';
            registrationResult.style.color = '#ff5252';
        }
    });
});
