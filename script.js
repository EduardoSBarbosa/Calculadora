class Calculadora 
{
  constructor() 
  {
    this.historico = document.querySelector('.historico');
    this.resultado = document.querySelector('.resultado');
    this.expressao = '';
  }

  adicionarEntrada(entrada) 
  {
    const ultimoCaractere = this.expressao.slice(-1);

    if (this.expressao === '' && ['+', '*', '/', '%'].includes(entrada)) 
    {
        return;
    } 

    if (ultimoCaractere === '.' && this.isOperador(entrada)) 
    {
        return;
    }

    if (this.isOperador(entrada) && this.isOperador(ultimoCaractere)) 
    {
        return;
    }

    if (entrada === '.') 
    {
        let ultimoNumeroTemPonto = false;
        let indiceDoUltimoOperador = -1;

        for (let i = this.expressao.length - 1; i >= 0; i--) 
        {
            if (this.isOperador(this.expressao[i])) 
            {
                indiceDoUltimoOperador = i;
                break;
            }
        }

        const ultimoNumero = this.expressao.slice(indiceDoUltimoOperador + 1);
        if (ultimoNumero.includes('.')) 
        {
            ultimoNumeroTemPonto = true;
        }

        if (ultimoNumeroTemPonto) 
        {
            return;
        }
    }
    
    if (entrada === 'x') 
    {
      entrada = '*';
    }
    
    if (entrada === ',') 
    {
      entrada = '.';
    }

    this.expressao += entrada;
    this.atualizarVisor();
  }

  limparTudo() 
  {
    this.expressao = '';
    this.historico.innerText = '';
    this.atualizarVisor();
  }
  
  apagarUltimo() 
  {
    this.expressao = this.expressao.slice(0, -1);
    this.atualizarVisor();
  }

  inverterSinal() 
  {
      if (this.expressao === '') 
      {
          return;
      }

      let indiceDoUltimoOperador = -1;
      let expressaoSemEspaco = this.expressao.replace(/\s/g, ''); // Remove espaços para simplificar a lógica
      
      for (let i = expressaoSemEspaco.length - 1; i >= 0; i--) 
      {
          if (this.isOperador(expressaoSemEspaco[i])) 
          {
              indiceDoUltimoOperador = i;
              break;
          }
      }

      const inicioExpressao = this.expressao.slice(0, indiceDoUltimoOperador + 1);
      const ultimoNumero = this.expressao.slice(indiceDoUltimoOperador + 1);

      if (ultimoNumero.startsWith('-')) 
      {
          this.expressao = inicioExpressao + ultimoNumero.slice(1);
      } else 
      {
          this.expressao = inicioExpressao + '-' + ultimoNumero;
      }
      this.atualizarVisor();
  }


  calcularResultado() 
  {
    try 
    {
      if (this.expressao === '') return;

      let expressaoParaCalcular = this.expressao.replace(/÷/g, '/').replace(/x/g, '*');
      let resultadoCalculado = eval(expressaoParaCalcular);

      resultadoCalculado = parseFloat(resultadoCalculado.toFixed(10));

      this.historico.innerText = this.expressao + ' =';
      this.resultado.innerText = resultadoCalculado;
      this.expressao = resultadoCalculado.toString();
    } catch (e) 
    {
      this.resultado.innerText = 'Erro';
      this.expressao = '';
    }
  }

  atualizarVisor() 
  {
    this.resultado.innerText = this.expressao || '0';
  }

  isOperador(caractere) 
  {
    return ['+', '-', '*', '/', '%'].includes(caractere);
  }
}

const calculadora = new Calculadora();

const botoes = document.querySelectorAll('.botoes');
botoes.forEach(botao => 
    {
  botao.addEventListener('click', () => 
    {
    const valor = botao.value;
    const id = botao.id;

    if (id === 'ce') 
    {
      calculadora.limparTudo();
    } else if (id === 'c') 
    {
      calculadora.apagarUltimo();
    } else if (id === 'igual') 
    {
      calculadora.calcularResultado();
    } else if (id === 'inverter') 
    {
      calculadora.inverterSinal();
    } else 
    {
      calculadora.adicionarEntrada(valor || botao.textContent);
    }
  });
});

calculadora.atualizarVisor();