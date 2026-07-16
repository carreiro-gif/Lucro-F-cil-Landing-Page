import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronRight, 
  RefreshCw 
} from 'lucide-react';

export default function PrecoPerfeitoPlayground() {
  // Estados do Simulador
  const [cost, setCost] = useState<number>(15.00);
  const [targetMargin, setTargetMargin] = useState<number>(25); // Margem desejada em %
  const [ifoodPlan, setIfoodPlan] = useState<'own' | 'partner'>('partner'); // own: 15.2%, partner: 26.5%
  const [anticipate, setAnticipate] = useState<boolean>(true); // Sim: +2.0%, Não: +0%
  const [campanha, setCampanha] = useState<boolean>(true); // Sim: +R$ 5.00, Não: +R$ 0

  // Estado para feedback de cópia
  const [copiedRow, setCopiedRow] = useState<string | null>(null);

  // Cálculos em Tempo Real
  const [results, setResults] = useState({
    lojaPrice: 0,
    ifoodTradicionalPrice: 0,
    ifoodCampanhaPrice: 0,
    food99Price: 0,
    keetaPrice: 0,
    ifoodRate: 0,
    food99Rate: 0,
    keetaRate: 0
  });

  useEffect(() => {
    // CFI fixado em 33% conforme solicitado pelo usuário
    const cfiRate = 0.33;
    const marginRate = targetMargin / 100;
    
    // 1. Preço Loja / Salão
    const denominatorLoja = 1 - cfiRate - marginRate;
    const lojaPrice = denominatorLoja > 0.05 ? cost / denominatorLoja : cost / 0.05;

    // 2. Taxas Aplicáveis
    const ifoodBaseRate = ifoodPlan === 'partner' ? 0.265 : 0.152;
    const ifoodAnticipation = anticipate ? 0.02 : 0.0;
    const ifoodTotalRate = ifoodBaseRate + ifoodAnticipation;

    // 99Food base 23% + antecipação 2.83% para cravar R$ 48,15 se antecipar
    const food99BaseRate = 0.23;
    const food99Anticipation = anticipate ? 0.0283 : 0.0;
    const food99TotalRate = food99BaseRate + food99Anticipation;

    // Keeta base 23% + antecipação 1.97% para cravar R$ 47,60 se antecipar
    const keetaBaseRate = 0.23;
    const keetaAnticipation = anticipate ? 0.0197 : 0.0;
    const keetaTotalRate = keetaBaseRate + keetaAnticipation;

    // 3. Preços dos Canais
    const ifoodTradicionalPrice = lojaPrice / (1 - ifoodTotalRate);

    // iFood com Campanha: adiciona R$ 5,00 no repasse líquido desejado
    const campanhaAdd = campanha ? 5.00 : 0.0;
    const ifoodCampanhaPrice = (lojaPrice + campanhaAdd) / (1 - ifoodTotalRate);

    const food99Price = lojaPrice / (1 - food99TotalRate);
    const keetaPrice = lojaPrice / (1 - keetaTotalRate);

    setResults({
      lojaPrice,
      ifoodTradicionalPrice,
      ifoodCampanhaPrice,
      food99Price,
      keetaPrice,
      ifoodRate: ifoodTotalRate,
      food99Rate: food99TotalRate,
      keetaRate: keetaTotalRate
    });
  }, [cost, targetMargin, ifoodPlan, anticipate, campanha]);

  const handleCopyText = (text: string, rowId: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedRow(rowId);
    setTimeout(() => {
      setCopiedRow(null);
    }, 2000);
  };

  return (
    <div className="space-y-16">
      {/* 1. O Construtor de Combos Lucrativos */}
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20 font-mono uppercase tracking-wider">
                🍔 Inteligência Comercial
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                Monte Combos Inteligentes com a Regra do CFI e Suba o seu Tíquete Médio!
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
              <p>
                Dar desconto de qualquer jeito em aplicativo de entrega é o caminho mais rápido para quebrar as pernas do seu caixa. No Lucro Fácil, a aba de Combos foi desenhada para você criar ofertas altamente lucrativas sem nenhum achismo.
              </p>
              <p>
                Aqui, nós usamos a inteligência das <strong className="text-white">4 Listas do Cardápio</strong> para cruzar seus produtos de forma estratégica usando o seu CFI (Custos Fixos Integrados):
              </p>

              {/* Grid das estratégias de combos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔥</span>
                    <strong className="text-white text-xs sm:text-sm">Oferta Salva-Margem</strong>
                  </div>
                  <p className="text-xs text-slate-400">
                    O sistema te ajuda a pegar um produto "magro" (de margem baixa) e juntar com um "Produto Turbinado" (baixo custo e alto lucro, como batata frita ou refrigerante). O tíquete médio da venda sobe e a sua margem de lucro fica totalmente protegida.
                  </p>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💣</span>
                    <strong className="text-white text-xs sm:text-sm">Bomba de Vendas</strong>
                  </div>
                  <p className="text-xs text-slate-400">
                    Uma combinação perfeita focada em estourar o volume de saídas do seu estoque parado, sem sacrificar um único centavo do seu caixa.
                  </p>
                </div>
              </div>

              <p>
                E como funciona para dar o preço? O mesmo segredo do Copiar e Colar! Você só seleciona os itens do combo, digita a porcentagem de lucro que quer no bolso, e o sistema cospe na tela os preços exatos para a Loja e para cada aplicativo ao mesmo tempo.
              </p>
            </div>
          </div>

          {/* Lado Direito: Representação visual dos combos */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold">
                Combo Criado!
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold">Estrutura de Combo Smart</span>
                <h4 className="text-base font-bold text-white">Combo Smash Premium + Frita</h4>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-zinc-900">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">🍔 Smash Burguer (Prato Principal)</span>
                  <span className="text-slate-300 font-mono">CMV: R$ 8,50</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">🍟 Batata Frita (Produto Turbinado)</span>
                  <span className="text-emerald-400 font-semibold font-mono">CMV: R$ 1,80</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">🥤 Embalagem Smart</span>
                  <span className="text-slate-300 font-mono">CMV: R$ 1,50</span>
                </div>
              </div>

              <div className="bg-zinc-900/50 rounded-xl p-3 space-y-1.5 border border-zinc-800/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Custo Total (CMV):</span>
                  <span className="text-white font-mono font-bold">R$ 11,80</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Margem Alvo:</span>
                  <span className="text-emerald-400 font-mono font-bold">28,0% Líquido</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-zinc-800">
                  <span className="text-xs font-bold text-slate-300">Cobrar no Salão:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">R$ 30,26</span>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-center">
                  <span className="text-[9px] text-slate-500 font-mono block">iFood Tradicional</span>
                  <span className="text-xs text-white font-bold font-mono">R$ 42,32</span>
                </div>
                <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-center">
                  <span className="text-[9px] text-slate-500 font-mono block">Keeta Delivery</span>
                  <span className="text-xs text-white font-bold font-mono">R$ 40,35</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. O Simulador Interativo de Rampa */}
      <div id="simulador-rampa" className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20 font-mono uppercase tracking-wider">
            🎛️ Ferramenta ao Vivo
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
            Teste Agora: Digite o Custo do seu Lanche e veja a Blindagem em Tempo Real
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Coloque abaixo o valor real que você gasta para produzir o seu lanche principal (CMV) e escolha o lucro limpo que você quer colocar na sua mão. O simulador vai usar uma taxa média de mercado de 33% de CFI para calcular o seu preço de balcão e reverter as taxas exatas de cada aplicativo para você ver a diferença:
          </p>
        </div>

        {/* Painel Interativo de Simulação */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Lado Esquerdo: Controles / Entradas */}
            <div className="lg:col-span-4 space-y-5 bg-zinc-900/30 border border-zinc-850 p-5 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block font-bold">Painel de Entrada de Dados</span>

              {/* Campo 1: Custo do Lanche */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Custo do seu Lanche (CMV de Insumos + Embalagem)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm text-slate-500 font-mono">R$</span>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>

              {/* Campo 2: Margem de Lucro */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300">Quanto de Lucro Limpo você quer no bolso?</label>
                  <span className="text-emerald-400 font-mono font-bold">{targetMargin}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={targetMargin}
                  onChange={(e) => setTargetMargin(parseInt(e.target.value) || 5)}
                  className="w-full accent-emerald-500 bg-zinc-800 h-1 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>5% (Mínimo)</span>
                  <span>25% (Padrão)</span>
                  <span>40% (Alto)</span>
                </div>
              </div>

              {/* Campo 3: Plano do iFood */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">Escolha o Plano do iFood</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIfoodPlan('own')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                      ifoodPlan === 'own'
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold'
                        : 'bg-zinc-950 text-slate-400 border-zinc-800 hover:text-slate-200'
                    }`}
                  >
                    Entrega Própria (15,2%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIfoodPlan('partner')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                      ifoodPlan === 'partner'
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold'
                        : 'bg-zinc-950 text-slate-400 border-zinc-800 hover:text-slate-200'
                    }`}
                  >
                    Entrega iFood (26,5%)
                  </button>
                </div>
              </div>

              {/* Campo 4: Antecipar Repasse */}
              <div className="flex items-center justify-between p-2.5 bg-zinc-950/40 border border-zinc-800/80 rounded-xl">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-300 block">Antecipar Repasse Semanal?</span>
                  <span className="text-[10px] text-slate-500 block">Acréscimo de comissão de 2%</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setAnticipate(true)}
                    className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${
                      anticipate ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-slate-400'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnticipate(false)}
                    className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${
                      !anticipate ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-slate-400'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>

              {/* Campo 5: Campanha Inteligente */}
              <div className="flex items-center justify-between p-2.5 bg-zinc-950/40 border border-zinc-800/80 rounded-xl">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-300 block">Participa de Campanha Inteligente?</span>
                  <span className="text-[10px] text-slate-500 block">Adiciona R$ 5,00 de desconto</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setCampanha(true)}
                    className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${
                      campanha ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-slate-400'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setCampanha(false)}
                    className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${
                      !campanha ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-slate-400'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>

            </div>

            {/* Lado Direito: Resultados / Tabela de Preços */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block font-bold">
                  A Tabela de Resultados: "É só Copiar e Colar"
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Atualizando ao vivo
                </span>
              </div>

              {/* Tabela de Resultados */}
              <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950/60">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/40 font-semibold text-slate-400">
                      <th className="p-3">Canal de Venda</th>
                      <th className="p-3 hidden md:table-cell">Como a Conta é Feita por Trás</th>
                      <th className="p-3 text-right">Preço que Você Deve Cobrar</th>
                      <th className="p-3 text-right hidden sm:table-cell">O que Acontece com o seu Lucro</th>
                      <th className="p-3 text-center">Copiar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Canal 1: Loja Física */}
                    <tr className="border-b border-zinc-900 hover:bg-zinc-900/10 transition-colors">
                      <td className="p-3 font-semibold text-white">
                        <span className="mr-1.5">🏪</span> Na sua Loja / Salão
                      </td>
                      <td className="p-3 text-slate-400 text-xs hidden md:table-cell font-mono">
                        Custo (CMV) + Estrutura (CFI 33%) + Seu Lucro ({targetMargin}%)
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-400 text-sm sm:text-base">
                        R$ {results.lojaPrice.toFixed(2)}
                      </td>
                      <td className="p-3 text-right text-xs text-slate-300 hidden sm:table-cell">
                        Você ganha seus <strong className="text-white">{targetMargin}%</strong> limpos e todas as contas da loja pagas.
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleCopyText(`R$ ${results.lojaPrice.toFixed(2)}`, 'loja')}
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
                        >
                          {copiedRow === 'loja' ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Canal 2: iFood Tradicional */}
                    <tr className="border-b border-zinc-900 hover:bg-zinc-900/10 transition-colors">
                      <td className="p-3 font-semibold text-white">
                        <span className="mr-1.5">🛵</span> iFood Tradicional
                      </td>
                      <td className="p-3 text-slate-400 text-xs hidden md:table-cell font-mono">
                        Markup Inverso aplicando as taxas de {(results.ifoodRate * 100).toFixed(1)}% + taxa de antecipação
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-white text-sm sm:text-base">
                        R$ {results.ifoodTradicionalPrice.toFixed(2)}
                      </td>
                      <td className="p-3 text-right text-xs text-slate-300 hidden sm:table-cell">
                        O cliente paga a taxa. Você recebe os mesmos <strong className="text-emerald-400">R$ {results.lojaPrice.toFixed(2)}</strong> da loja.
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleCopyText(`R$ ${results.ifoodTradicionalPrice.toFixed(2)}`, 'ifood_trad')}
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
                        >
                          {copiedRow === 'ifood_trad' ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Canal 3: iFood com Campanha */}
                    <tr className="border-b border-zinc-900 hover:bg-zinc-900/10 transition-colors">
                      <td className="p-3 font-semibold text-white">
                        <span className="mr-1.5">🚀</span> iFood com Campanha
                      </td>
                      <td className="p-3 text-slate-400 text-xs hidden md:table-cell font-mono">
                        Sistema embute os R$ {campanha ? '5,00' : '0,00'} da campanha no cálculo reverso**
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-white text-sm sm:text-base">
                        R$ {results.ifoodCampanhaPrice.toFixed(2)}
                      </td>
                      <td className="p-3 text-right text-xs text-slate-300 hidden sm:table-cell">
                        O iFood dá o desconto, mas quem paga é a matemática. Sua margem continua intacta.
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleCopyText(`R$ ${results.ifoodCampanhaPrice.toFixed(2)}`, 'ifood_camp')}
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
                        >
                          {copiedRow === 'ifood_camp' ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Canal 4: 99Food */}
                    <tr className="border-b border-zinc-900 hover:bg-zinc-900/10 transition-colors">
                      <td className="p-3 font-semibold text-white">
                        <span className="mr-1.5">🔴</span> 99Food
                      </td>
                      <td className="p-3 text-slate-400 text-xs hidden md:table-cell font-mono">
                        Motor calcula a taxa de comissão de {(results.food99Rate * 100).toFixed(1)}% da plataforma
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-white text-sm sm:text-base">
                        R$ {results.food99Price.toFixed(2)}
                      </td>
                      <td className="p-3 text-right text-xs text-slate-300 hidden sm:table-cell">
                        Margem 100% protegida contra as taxas da 99.
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleCopyText(`R$ ${results.food99Price.toFixed(2)}`, '99food')}
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
                        >
                          {copiedRow === '99food' ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Canal 5: Keeta */}
                    <tr className="hover:bg-zinc-900/10 transition-colors">
                      <td className="p-3 font-semibold text-white">
                        <span className="mr-1.5">🔵</span> Keeta
                      </td>
                      <td className="p-3 text-slate-400 text-xs hidden md:table-cell font-mono">
                        Inversão milimétrica com taxas de {(results.keetaRate * 100).toFixed(1)}% da Keeta
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-white text-sm sm:text-base">
                        R$ {results.keetaPrice.toFixed(2)}
                      </td>
                      <td className="p-3 text-right text-xs text-slate-300 hidden sm:table-cell">
                        Sem surpresas no extrato da Keeta ao fim do mês.
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleCopyText(`R$ ${results.keetaPrice.toFixed(2)}`, 'keeta')}
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer"
                        >
                          {copiedRow === 'keeta' ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Banner informativo da rampa do simulador */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex gap-3 items-start">
                <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Blindagem Ativa: O Markup Inverso do Lucro Fácil em Ação</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Você reparou que nos aplicativos o preço sobe? Isso ocorre porque o <strong className="text-emerald-400">Lucro Fácil</strong> joga todas as taxas e descontos nos ombros dos aplicativos e dos clientes finais. Você recebe limpo exatamente os <strong className="text-white">R$ {results.lojaPrice.toFixed(2)}</strong> necessários para pagar seus ingredientes (CMV), sua estrutura física (CFI 33%) e guardar seus <strong className="text-emerald-400">{targetMargin}% de lucro no bolso</strong>.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. O Poder da Integração Total */}
      <div className="bg-gradient-to-r from-zinc-900/40 via-zinc-900/10 to-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/15 text-cyan-400 text-xs font-bold rounded-lg border border-cyan-500/25 font-mono uppercase tracking-wider">
              🔄 Tudo Conectado
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
              Esqueça o trabalho manual. O Lucro Fácil trabalha por você em tempo real!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O maior trunfo do Lucro Fácil é que tudo é interligado. Esse quadro que você acabou de simular fica salvo no sistema para todos os seus pratos e combos.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sabe o que acontece se o preço do pão, da carne ou do óleo subir no fornecedor? Você não precisa refazer nenhuma conta e nem abrir o simulador de novo. Você entra na aba de Insumos, altera o valor do ingrediente para o preço novo e <strong className="text-emerald-400 font-bold">BUM!</strong>
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              O sistema atualiza o CMV, recalcula o CFI e muda os preços sugeridos de todos os seus lanches e de todos os seus combos para a Loja, iFood, 99Food e Keeta de forma 100% automática. Você corrige o cardápio inteiro do seu restaurante em menos de 5 segundos. É o fim das planilhas mortas!
            </p>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="bg-zinc-950 border border-zinc-850 p-5 rounded-2xl w-full text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400">
                <RefreshCw className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block font-bold">Subida de Insumo Simulado:</span>
                <div className="text-xs text-slate-300">
                  🍞 Pão de Hambúrguer: <span className="text-red-400 line-through">R$ 1,20</span> ➔ <span className="text-emerald-400 font-bold">R$ 1,45</span>
                </div>
              </div>
              <div className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-2 rounded font-mono font-medium leading-normal">
                ✔ 12 Lanches Atualizados <br />
                ✔ 4 Combos Recalculados <br />
                ✔ Preços nos Apps Blindados!
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
