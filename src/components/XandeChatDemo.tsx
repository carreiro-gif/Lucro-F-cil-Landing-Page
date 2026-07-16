import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, CheckCircle2, AlertTriangle, Coffee, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PresetMessage {
  id: string;
  label: string;
  question: string;
  answer: string[];
}

const PRESETS: PresetMessage[] = [
  {
    id: 'salva-margem',
    label: 'Combo Salva-Margem',
    question: 'Como uso a Oferta Salva-Margem para subir o tíquete médio?',
    answer: [
      '**Xande IA:** Excelente pergunta! A **Oferta Salva-Margem** é perfeita para combinar um produto **Campeão de Vendas (mas com Margem Baixa)** com um produto **Gordo de Margem (baixo custo e alto valor percebido)**.',
      'Aqui está o plano prático:',
      '1. Pegue seu Hambúrguer mais vendido (ex: custo R$ 14,00, preço sugerido R$ 32,00 — margem espremida de 18% no iFood). Ele é o seu **Campeão Magro**.',
      '2. Combine-o em um combo com uma **Batata Frita Turbinada** (custo R$ 2,50, valor percebido alto) e um **Refresco Artesanal** (custo R$ 1,20).',
      '3. Em vez de dar desconto simples de 15% no hambúrguer sozinho, ofereça o Combo por R$ 45,00. Seu custo sobe apenas R$ 3,70, mas o faturamento sobe R$ 13,00!',
      '**Resultado:** Sua margem média ponderada do pedido salta de **18% para 32.4%** e o cliente percebe muito mais valor na compra.'
    ]
  },
  {
    id: 'cmv-alto',
    label: 'CMV em 38.5%',
    question: 'Meu CMV fechou em 38.5% este mês. Como reduzo isso na prática?',
    answer: [
      '**Xande IA:** 38.5% de CMV Geral está na zona vermelha de perigo para o modelo de rampa. Vamos fazer uma auditoria imediata de cozinha sem estressar sua operação:',
      '• **Audite o Fator de Correção:** Carne bovina perde peso limpando e cozinhando. Se você compra por R$ 35,00/kg e limpa 20% de aparas, seu custo real limpo é R$ 43,75/kg. Cadastre o fator de correção 1.25 no Lucro Fácil de imediato.',
      '• **Identifique "Ladrões de Caixa":** Suas guarnições (arroz, batata, molho) costumam ser colocadas sem pesagem na rampa. Cada colher extra de maionese caseira por hambúrguer pode sugar R$ 1.500 no final do mês!',
      '• **Cascade de Fornecedor:** Abra a tela de Insumos, mude o preço do quilo do óleo e veja quais pratos sofreram em cascata. Substitua ou renegocie com o fornecedor.',
      'Foque em baixar 1% por semana aplicando porções padronizadas. No Lucro Fácil, cada ficha técnica te avisa onde está o excesso!'
    ]
  },
  {
    id: 'perda-carne',
    label: 'Fator de Correção',
    question: 'Como calculo a quebra do meu hambúrguer que encolhe 22% na chapa?',
    answer: [
      '**Xande IA:** Essa é uma das perdas invisíveis mais perigosas! É a diferença entre o **Peso Bruto** (comprado) e o **Peso Líquido** (servido).',
      'Vamos usar a fórmula do **Fator de Correção (FC)**:',
      '• **FC = Peso Bruto / Peso Líquido**',
      '• Se o seu hambúrguer bruto pesa 150g antes de ir para a chapa e sai de lá com 117g devido ao encolhimento de gordura e água, seu FC é de **150 / 117 = 1.28**.',
      '• Na hora de cadastrar sua Ficha Técnica no Lucro Fácil, você coloca 117g de peso líquido e o FC de 1.28. O sistema automaticamente calcula o custo real de compra de 150g por prato.',
      'Sem isso, você estaria precificando com base em 117g e pagando o custo do encolhimento do seu próprio caixa.'
    ]
  },
  {
    id: 'ifood-hits',
    label: 'Campanhas do iFood',
    question: 'Como calculo meu preço de venda final se a comissão incidir sobre o valor cheio com cupons?',
    answer: [
      '**Xande IA:** Perigo máximo aqui! Esse é o erro mais caro do delivery moderno.',
      'Quando você entra em campanhas como "iFood Hits" ou oferece cupons automáticos, a comissão do iFood (ex: 23%) incide sobre o **preço original** do prato antes do desconto, ou o desconto é dividido.',
      'Para evitar bitributação e prejuízo:',
      '• No Lucro Fácil, habilite o toggle de "iFood Hits" na aba de canais de venda.',
      '• O sistema aplica um Markup Inverso recalculado, adicionando a taxa de comissão sobre a diferença de preço.',
      '• Se você dá R$ 5,00 de desconto no prato de R$ 30,00, a comissão de 23% morde R$ 6,90. Isso significa que você recebe apenas R$ 18,10. Tirando o custo, seu lucro evapora.',
      '**O Xande recomenda:** Nunca use cupons de desconto simples sem recalcular o Markup Inverso para o canal promocional. O Lucro Fácil blinda essa margem na hora!'
    ]
  }
];

export default function XandeChatDemo() {
  const [messages, setMessages] = useState<Array<{ sender: 'xande' | 'user'; text: string; id: number }>>([
    {
      id: 1,
      sender: 'xande',
      text: 'Olá! Sou o **Xande**, seu copiloto de inteligência financeira e precificação de rampa da Lucro Fácil. Clique em uma das perguntas frequentes abaixo ou simule uma dúvida de restaurante para ver como eu blindo suas margens.'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handlePresetClick = (preset: PresetMessage) => {
    if (isTyping) return;

    // Adiciona pergunta do usuário
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: preset.question }]);
    
    // Inicia digitação do Xande
    setIsTyping(true);

    // Adiciona as respostas do Xande de forma progressiva
    setTimeout(() => {
      setIsTyping(false);
      const answerText = preset.answer.join('\n\n');
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'xande', text: answerText }]);
    }, 1500);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isTyping) return;

    const userInputText = customInput;
    setCustomInput('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userInputText }]);
    setIsTyping(true);

    // Simular resposta genérica inteligente
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'xande',
          text: `**Xande IA:** Entendo perfeitamente o seu ponto! Na operação de rampa de restaurantes, questões sobre "${userInputText}" sempre voltam para o controle milimétrico do **Markup Inverso** e o monitoramento rigoroso do **CMV por Ficha Técnica**.\n\nPara blindar seu lucro nesse cenário, o melhor caminho é cadastrar a receita no Lucro Fácil, definir sua **Régua da Casa** (mínimo de 20% de margem líquida limpa) e aplicar o recálculo automático de canais de entrega. Se preferir, posso te guiar em um dos tópicos rápidos do menu de simulações!`
        }
      ]);
    }, 1500);
  };

  // Helper para formatar negritos simples na UI simulada
  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, idx) => {
      // Substituir **texto** por tag strong
      const parts = paragraph.split('**');
      const formattedParts = parts.map((part, pIdx) => {
        if (pIdx % 2 !== 0) {
          return <strong key={pIdx} className="text-emerald-400 font-semibold">{part}</strong>;
        }
        // Substituir bullets simples • por estilizados
        if (part.startsWith('• ') || part.startsWith('1. ') || part.startsWith('2. ') || part.startsWith('3. ') || part.startsWith('4. ')) {
          return <span key={pIdx} className="text-slate-300">{part}</span>;
        }
        return part;
      });

      return (
        <p key={idx} className="text-xs leading-relaxed text-slate-300 mb-2">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <div id="xande-chat-demo" className="w-full glass-panel rounded-2xl border border-slate-800 flex flex-col h-[520px] overflow-hidden">
      
      {/* Header do Chat */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-emerald-500/20 bg-emerald-500/10">
              <img 
                src="/assets/imagens/xande-avatar.png" 
                alt="Xande IA" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-display font-bold text-sm text-white">Xande IA</h4>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full font-semibold border border-emerald-500/20 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> Consultor Ativo
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Inteligência de Precificação e Rampa</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span>Xande conectado</span>
        </div>
      </div>

      {/* Janela de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/40 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`rounded-lg shrink-0 mt-0.5 border overflow-hidden ${
                msg.sender === 'user'
                  ? 'p-1.5 bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'w-7.5 h-7.5 border-slate-700 bg-slate-800'
              }`}>
                {msg.sender === 'user' ? (
                  <User className="w-3.5 h-3.5" />
                ) : (
                  <img 
                    src="/assets/imagens/xande-avatar.png" 
                    alt="Xande IA" 
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <div className={`rounded-xl px-3.5 py-2.5 border text-xs shadow-md ${
                msg.sender === 'user'
                  ? 'bg-slate-900 border-slate-800 text-slate-200'
                  : 'bg-slate-950/90 border-slate-800/80 text-slate-300'
              }`}>
                {formatText(msg.text)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="w-7.5 h-7.5 rounded-lg shrink-0 mt-0.5 bg-slate-800 border border-slate-700 overflow-hidden">
              <img 
                src="/assets/imagens/xande-avatar.png" 
                alt="Xande IA" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="bg-slate-950/90 border border-slate-800/80 rounded-xl px-4 py-3 flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Menu de Sugestões / Presets */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/40">
        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block mb-1">Escolha uma dúvida de rampa:</span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-nowrap">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              disabled={isTyping}
              className="text-[10px] font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 rounded-full px-3 py-1.5 shrink-0 transition-all duration-250 hover:text-emerald-400 disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Caixa de Input */}
      <form onSubmit={handleCustomSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Tire suas dúvidas (ex: calcular margem do açaí, markup...)"
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-lg px-3 py-2 text-xs text-white"
          disabled={isTyping}
        />
        <button
          type="submit"
          className="p-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-colors flex items-center justify-center shrink-0 disabled:opacity-50"
          disabled={isTyping || !customInput.trim()}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
