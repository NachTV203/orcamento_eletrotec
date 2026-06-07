let modoAtual = 'orcamento';

        document.addEventListener('DOMContentLoaded', () => {
            const hoje = new Date().toLocaleDateString('pt-BR');
            document.getElementById('f_data').value = hoje;
            document.getElementById('r_data').value = hoje;
            document.getElementById('fat_data').value = hoje;
            document.getElementById('fat_data_ass').value = `Brasília, ${hoje}.`;
            
            // Inicia Orçamento com 3 linhas
            adicionarLinhaForm(); adicionarLinhaForm(); adicionarLinhaForm();
            // Inicia Fatura com 2 linhas
            adicionarLinhaFatura(); adicionarLinhaFatura();
            
            atualizarFolha();
            atualizarRecibo();
            atualizarFatura();
        });

        // Controle das 3 Abas
        function mudarAba(abaSelecionada) {
            modoAtual = abaSelecionada;
            
            document.getElementById('btn-orcamento').classList.remove('ativo');
            document.getElementById('btn-recibo').classList.remove('ativo');
            document.getElementById('btn-fatura').classList.remove('ativo');
            document.getElementById('btn-' + abaSelecionada).classList.add('ativo');

            const subTag = document.getElementById('subtitulo-menu');
            
            document.getElementById('area-orcamento').style.display = 'none';
            document.getElementById('area-recibo').style.display = 'none';
            document.getElementById('area-fatura').style.display = 'none';
            document.getElementById('folha-orcamento').style.display = 'none';
            document.getElementById('folha-recibo').style.display = 'none';
            document.getElementById('folha-fatura').style.display = 'none';

            if(abaSelecionada === 'orcamento') {
                subTag.innerText = "Orçamento";
                document.getElementById('area-orcamento').style.display = 'block';
                document.getElementById('folha-orcamento').style.display = 'block';
            } else if(abaSelecionada === 'recibo') {
                subTag.innerText = "Recibo";
                document.getElementById('area-recibo').style.display = 'block';
                document.getElementById('folha-recibo').style.display = 'block';
                
                // Puxa o nome do orçamento para facilitar se estiver vazio
                if(document.getElementById('f_nome').value !== '' && document.getElementById('r_nome').value === '') {
                    document.getElementById('r_nome').value = document.getElementById('f_nome').value;
                    atualizarRecibo();
                }
            } else if(abaSelecionada === 'fatura') {
                subTag.innerText = "Fatura Comercial";
                document.getElementById('area-fatura').style.display = 'block';
                document.getElementById('folha-fatura').style.display = 'block';

                // Copia os dados do cliente do orçamento se estiverem vazios
                if(document.getElementById('f_nome').value !== '' && document.getElementById('fat_cliente_nome').value === '') {
                    document.getElementById('fat_cliente_nome').value = document.getElementById('f_nome').value;
                    document.getElementById('fat_cliente_cnpj').value = document.getElementById('f_cpf').value;
                    document.getElementById('fat_cliente_end').value = document.getElementById('f_endereco').value;
                    atualizarFatura();
                }
            }
        }

        /* -------------------------------------
           LÓGICA DO ORÇAMENTO (INTACTA)
        -------------------------------------- */
        function adicionarLinhaForm() {
            const tbody = document.getElementById('tbody-form-itens');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="item-desc" placeholder="Descreva..." oninput="atualizarFolha()"></td>
                <td><input type="text" class="item-qtd" placeholder="0" oninput="atualizarFolha()"></td>
                <td><input type="number" class="item-valor" placeholder="0.00" oninput="atualizarFolha()"></td>
            `;
            tbody.appendChild(tr);
        }

        function atualizarFolha() {
            const campos =['os', 'data', 'validade', 'nome', 'telefone', 'email', 'cpf', 'insc', 'endereco', 'bairro', 'cidade', 'cep', 'prestacao', 'info_adc'];
            campos.forEach(campo => { document.getElementById('v_' + campo).innerText = document.getElementById('f_' + campo).value; });

            const descricoes = document.querySelectorAll('.item-desc');
            const quantidades = document.querySelectorAll('.item-qtd');
            const valores = document.querySelectorAll('.item-valor');

            const v_tbody = document.getElementById('v_tbody_itens');
            v_tbody.innerHTML = '';
            let valorTotal = 0;

            for (let i = 0; i < 20; i++) {
                let desc = '', qtd = '', valFormatado = '';
                if (i < descricoes.length) {
                    desc = descricoes[i].value; qtd = quantidades[i].value;
                    let val = parseFloat(valores[i].value);
                    if (!isNaN(val)) {
                        valorTotal += val; valFormatado = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    }
                }
                v_tbody.innerHTML += `<tr><td>${i + 1}</td><td class="left-align">${desc}</td><td>${qtd}</td><td>${valFormatado}</td></tr>`;
            }
            document.getElementById('v_total').innerText = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        function atualizarRecibo() {
            document.getElementById('v_r_nome').innerText = document.getElementById('r_nome').value || '____________________________________';
            document.getElementById('v_r_extenso').innerText = document.getElementById('r_extenso').value || '________________________________________________';
            document.getElementById('v_r_referente').innerText = document.getElementById('r_referente').value || '____________________________________________________________________';
            document.getElementById('v_r_data').innerText = document.getElementById('r_data').value || '__/__/____';
            
            let valorNum = parseFloat(document.getElementById('r_valor').value);
            document.getElementById('v_r_valor').innerText = !isNaN(valorNum) ? valorNum.toLocaleString('pt-BR', {minimumFractionDigits: 2}) : "0,00";
        }

        function adicionarLinhaFatura() {
            const tbody = document.getElementById('tbody-form-fatura');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="fat-desc" placeholder="Serviço..." oninput="atualizarFatura()"></td>
                <td><input type="number" class="fat-qtd" placeholder="1" oninput="atualizarFatura()"></td>
                <td><input type="number" class="fat-diarias" placeholder="1" oninput="atualizarFatura()"></td>
                <td><input type="number" class="fat-val" placeholder="0.00" oninput="atualizarFatura()"></td>
            `;
            tbody.appendChild(tr);
        }

        function atualizarFatura() {
            // Atualiza textos
            const campos =['numero', 'data', 'cliente_nome', 'cliente_cnpj', 'cliente_insc', 'cliente_end', 'cliente_cidade', 'extenso', 'projeto', 'data_ass'];
            campos.forEach(c => {
                document.getElementById('v_fat_' + c).innerText = document.getElementById('fat_' + c).value;
            });

            // Atualiza a tabela com o cálculo 
            const descricoes = document.querySelectorAll('.fat-desc');
            const quantidades = document.querySelectorAll('.fat-qtd');
            const diarias = document.querySelectorAll('.fat-diarias');
            const valores = document.querySelectorAll('.fat-val');

            const v_tbody = document.getElementById('v_tbody_fatura');
            v_tbody.innerHTML = '';
            
            let totalFatura = 0;

            for (let i = 0; i < descricoes.length; i++) {
                let desc = descricoes[i].value;
                if (!desc) continue; 

                let qtd = parseFloat(quantidades[i].value) || 1; // Se tiver vazio, calcula como 1
                let dia = parseFloat(diarias[i].value) || 1; // Se tiver vazio, calcula como 1
                let valUnit = parseFloat(valores[i].value) || 0;
                
                let valTotalLinha = qtd * dia * valUnit;
                totalFatura += valTotalLinha;

                v_tbody.innerHTML += `
                    <tr>
                        <td class="left-align">${desc}</td>
                        <td>${quantidades[i].value || ''}</td>
                        <td>${diarias[i].value || ''}</td>
                        <td>unidade</td>
                        <td>${valUnit > 0 ? valUnit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}</td>
                        <td>${valTotalLinha > 0 ? valTotalLinha.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}</td>
                    </tr>
                `;
            }

            
            let totalFormat = totalFatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById('v_fat_total').innerText = totalFormat;
            document.getElementById('v_fat_total_txt').innerText = totalFormat;
        }

    
        function gerarPDF() {
            let elementoParaGerar, nomeArquivo;

            if(modoAtual === 'orcamento') {
                elementoParaGerar = document.getElementById('folha-orcamento');
                nomeArquivo = `Orcamento_${document.getElementById('f_nome').value || 'Cliente'}.pdf`;
            } else if (modoAtual === 'recibo') {
                elementoParaGerar = document.getElementById('folha-recibo');
                nomeArquivo = `Recibo_${document.getElementById('r_nome').value || 'Cliente'}.pdf`;
            } else {
                elementoParaGerar = document.getElementById('folha-fatura');
                nomeArquivo = `Fatura_${document.getElementById('fat_cliente_nome').value || 'Cliente'}.pdf`;
            }
            
            const opcoes = {
                margin:       0,
                filename:     nomeArquivo,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, allowTaint: true },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().set(opcoes).from(elementoParaGerar).save();
        }
