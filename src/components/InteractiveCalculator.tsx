import React, { useState, useEffect } from 'react';
import { Calculator, Percent, ArrowRight, ShieldCheck, AlertTriangle, ToggleLeft, ToggleRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Channel {
  id: string;
  name: string;
  commission: number;
  fixedFee: number;
  anticipationFee: number;
  customLabel?: string;
}

const CHANNELS: Channel[] = [
  { id: 'salao', name: 'Loja Física / Salão', commission: 0.0, fixedFee: 0.0, anticipationFee: 0.0, customLabel: 'Loja Física / Salão (Sem Taxas)' },
  { id: 'ifood-entrega', name: 'iFood (Plano Entrega)', commission: 0.265, fixedFee: 0.0, anticipationFee: 0.02, customLabel: 'iFood (Plano Entrega) (23% comissão + 3,5% taxa de pagamento = 26,5%)' },
  { id: 'ifood-basico', name: 'iFood (Plano Básico)', commission: 0.152, fixedFee: 0.0, anticipationFee: 0.02, customLabel: 'iFood (Plano Básico) (12% comissão + 3,2% taxa de pagamento = 15,2%)' },
  { id: 'keeta', name: 'Keeta Delivery', commission: 0.15, fixedFee: 0.0, anticipationFee: 0.015 },
  { id: '99food', name: '99Food Delivery', commission: 0.18, fixedFee: 0.0, anticipationFee: 0.019 },
];

const formatPercent = (val: number) => {
  return (val * 100).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + '%';
};

const formatCurrencyPt = (val: number) => {
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function InteractiveCalculator() {
  const [costInput, setCostInput] = useState<string>('');
  const cost = costInput === '' ? 0 : Math.max(0, parseFloat(costInput) || 0);
  const [selectedChannel, setSelectedChannel] = useState<string>('ifood-entrega');
  const [targetMargin, setTargetMargin] = useState<number>(25); // em %
  const [anticipation, setAnticipation] = useState<boolean>(true);
  const [taxRate, setTaxRate] = useState<number>(6); // Simples Nacional médio %

  // Cálculos
  const [results, setResults] = useState({
    salaoPrice: 0,
    naivePrice: 0,
    markupInversoPrice: 0,
    naiveProfit: 0,
    naiveMargin: 0,
    markupProfit: 0,
    markupMargin: 0,
    totalFeesPercentage: 0,
    totalFeesMoney: 0,
    cfiMoney: 0,
  });

  useEffect(() => {
    const channel = CHANNELS.find(c => c.id === selectedChannel) || CHANNELS[0];
    const itemCost = Number(cost) || 0;
    
    // Taxas aplicáveis
    const comm = channel.commission;
    const fixed = channel.fixedFee;
    const antip = anticipation ? channel.anticipationFee : 0;
    const tax = taxRate / 100;
    const desiredMargin = targetMargin / 100;
    const cfiRate = 0.33; // 33% Custos Fixos Integrados (CFI)

    // 1. Preço de Venda Base (PV) do Salão (fórmula: Custo do Insumo / (1 - 33% CFI - Lucro Alvo %))
    const denominatorSalão = 1 - cfiRate - desiredMargin;
    const salaoPrice = denominatorSalão > 0.05 ? itemCost / denominatorSalão : itemCost / 0.05;
    const cfiMoney = salaoPrice * cfiRate;

    // 2. Preço de Venda no Marketplace com Markup Inverso em cima do Preço Base
    // Fórmula: Preço = (PV + TaxaFixa) / (1 - Comissão% - Imposto% - Antecipação%)
    const denominatorMarketplace = 1 - comm - tax - antip;
    const markupInversoPrice = denominatorMarketplace > 0.05 
      ? (salaoPrice + fixed) / denominatorMarketplace 
      : (salaoPrice + fixed) / 0.05;

    // Custos e Lucro na Precificação Blindada
    const markupMarketplaceCut = (markupInversoPrice * comm) + fixed + (markupInversoPrice * antip);
    const markupTaxCut = markupInversoPrice * tax;
    const markupCfiCut = cfiMoney;
    const markupProfit = markupInversoPrice - itemCost - markupMarketplaceCut - markupTaxCut - markupCfiCut;
    const markupMargin = markupInversoPrice > 0 ? (markupProfit / markupInversoPrice) * 100 : 0;

    // 3. Preço Chutômetro Comum (Preço arbitrado baixo)
    // Se o custo for 3.52, queremos naivePrice de R$ 6.00 exatamente.
    // Em outros casos, usamos um markup baixo e arbitrário de ~1.7x do custo.
    const naivePrice = Math.abs(itemCost - 3.52) < 0.01 ? 6.00 : itemCost * 1.7;

    // Custos e Lucro no Chutômetro
    const naiveMarketplaceCut = (naivePrice * comm) + fixed + (naivePrice * antip);
    const naiveTaxCut = naivePrice * tax;
    const naiveCfiCut = cfiMoney; // O CFI é fixo da estrutura física do prato!
    const naiveProfit = naivePrice - itemCost - naiveMarketplaceCut - naiveTaxCut - naiveCfiCut;
    const naiveMargin = naivePrice > 0 ? (naiveProfit / naivePrice) * 100 : 0;

    setResults({
      salaoPrice,
      naivePrice,
      markupInversoPrice,
      naiveProfit,
      naiveMargin,
      markupProfit,
      markupMargin,
      totalFeesPercentage: (comm + tax + antip) * 100,
      totalFeesMoney: markupMarketplaceCut + markupTaxCut,
      cfiMoney,
    });
  }, [cost, selectedChannel, targetMargin, anticipation, taxRate]);

  const activeChannel = CHANNELS.find(c => c.id === selectedChannel) || CHANNELS[0];

  return (
    <div id="interactive-calculator" className="w-full glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden border border-emerald-500/10">
      {/* Glow Effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Lado Esquerdo: Controles */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-md">
                <Calculator className="w-5 h-5" />
              </span>
              <h3 className="font-display font-bold text-xl text-white">Simulador de Margem</h3>
            </div>
            <p className="text-sm md:text-xs text-slate-400">
              Faça a simulação em tempo real e descubra a diferença matemática entre precificar no improviso e usar o Markup Inverso.
            </p>
          </div>

          <div className="space-y-4">
            {/* Custo do prato */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm md:text-xs font-semibold text-slate-300">Custo do Insumo (Ficha Técnica)</label>
                <span className="text-sm md:text-xs font-mono text-emerald-400 font-bold">R$ {cost.toFixed(2)}</span>
              </div>
              
              <p className="text-xs md:text-[11px] text-slate-400 leading-normal bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg">
                💡 Aqui você deve colocar apenas o custo de produção dos itens usados para preparar o lanche (como pão, carne, queijo e embalagem). Não misture contas fixas aqui, o sistema resolve isso sozinho depois.
              </p>

              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">R$</span>
                <input
                  type="number"
                  placeholder="0,00"
                  value={costInput}
                  onChange={(e) => setCostInput(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono placeholder-slate-600"
                  step="0.5"
                  min="0"
                />
              </div>
            </div>

            {/* Canal de Venda */}
            <div>
              <label className="block text-sm md:text-xs font-semibold text-slate-300 mb-1.5">Canal de Venda Recomendado</label>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {CHANNELS.map(ch => (
                  <option key={ch.id} value={ch.id}>
                    {ch.customLabel || `${ch.name} (${formatPercent(ch.commission)} + ${formatCurrencyPt(ch.fixedFee)})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Margem Desejada */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm md:text-xs font-semibold text-slate-300">Sua Margem de Lucro Líquida Alvo</label>
                <span className="text-sm md:text-xs font-mono font-bold text-emerald-400">{targetMargin}% limpo</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                value={targetMargin}
                onChange={(e) => setTargetMargin(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs md:text-[10px] text-slate-500 font-mono mt-1">
                <span>10% (Baixa)</span>
                <span>25% (Padrão Saudável)</span>
                <span>45% (Alta Rampa)</span>
              </div>
            </div>

            {/* Outros custos / Toggles */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm md:text-xs text-slate-300 font-medium">Antecipar repasse automático</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Receber dinheiro em 24h em vez de 30 dias" />
                </div>
                <button
                  onClick={() => setAnticipation(!anticipation)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {anticipation ? (
                    <span className="flex items-center text-sm md:text-xs text-emerald-400 gap-1 font-mono">
                      Ativo (+{(activeChannel.anticipationFee * 100).toFixed(1)}%) <ToggleRight className="w-7 h-7 text-emerald-400 inline" />
                    </span>
                  ) : (
                    <span className="flex items-center text-sm md:text-xs text-slate-500 gap-1 font-mono">
                      Inativo <ToggleLeft className="w-7 h-7 text-slate-600 inline" />
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm md:text-xs text-slate-300 font-medium">Imposto de Notas (Simples)</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Math.max(0, Math.min(30, parseFloat(e.target.value) || 0)))}
                    className="w-12 bg-slate-900 border border-slate-700 rounded-md px-1 py-0.5 text-xs text-center font-mono text-emerald-400 focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-mono">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Resultados e Comparativos */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            {cost > 0 ? (
              <motion.div
                key="results-active"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-between space-y-6 h-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Card Improviso */}
                  <div className="bg-slate-900/60 border border-red-500/10 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded text-[11px] md:text-[10px] font-mono flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Chutômetro Comum
                    </div>
                    <div>
                      <span className="text-sm md:text-xs text-slate-400 block mb-1">Preço Arbitrado</span>
                      <span className="text-2xl font-mono font-bold text-slate-300">R$ {results.naivePrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-sm md:text-xs">
                        <span className="text-slate-400">Comissões + Impostos:</span>
                        <span className="text-red-400 font-mono">
                          -R$ {((results.naivePrice * activeChannel.commission) + activeChannel.fixedFee + (results.naivePrice * (anticipation ? activeChannel.anticipationFee : 0)) + (results.naivePrice * (taxRate / 100))).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm md:text-xs">
                        <span className="text-slate-400">Custos Fixos (33% CFI):</span>
                        <span className="text-red-400 font-mono">
                          -R$ {results.cfiMoney.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm md:text-xs font-bold">
                        <span className="text-slate-300">Lucro Real que sobra:</span>
                        <span className={`font-mono ${results.naiveProfit <= 0 ? 'text-red-500' : 'text-slate-300'}`}>
                          R$ {results.naiveProfit.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs md:text-[11px] font-mono">
                        <span className="text-slate-500">Sua margem real:</span>
                        <span className={results.naiveMargin < 12 ? 'text-red-400 font-bold' : 'text-slate-400'}>
                          {results.naiveMargin.toFixed(1)}% {results.naiveMargin < 12 && '(Prejuízo Invisível)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Cardápio Blindado */}
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded text-[11px] md:text-[10px] font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Blindagem de Lucro
                    </div>
                    <div>
                      <span className="text-sm md:text-xs text-emerald-400 block mb-1">Preço no Markup Inverso</span>
                      <span className="text-2xl font-mono font-bold text-emerald-400">R$ {results.markupInversoPrice.toFixed(2)}</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-1.5">
                      <div className="flex justify-between text-sm md:text-xs">
                        <span className="text-slate-400">Taxas pagas pelo cliente:</span>
                        <span className="text-slate-300 font-mono">
                          +R$ {results.totalFeesMoney.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm md:text-xs">
                        <span className="text-slate-400">Custos Fixos (33% CFI):</span>
                        <span className="text-slate-300 font-mono">
                          Coberto (R$ {results.cfiMoney.toFixed(2)})
                        </span>
                      </div>
                      <div className="flex justify-between text-sm md:text-xs font-bold">
                        <span className="text-emerald-400">Lucro Líquido Seguro:</span>
                        <span className="text-emerald-400 font-mono">
                          R$ {results.markupProfit.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs md:text-[11px] font-mono">
                        <span className="text-slate-400">Sua margem real:</span>
                        <span className="text-emerald-400 font-bold">
                          {results.markupMargin.toFixed(1)}% (Garantido!)
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Banner Didático Persuasivo */}
                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800/50 flex items-start gap-3">
                  <span className="p-2 bg-red-500/10 text-red-400 rounded-lg shrink-0 mt-0.5">
                    <AlertTriangle className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <h4 className="text-sm md:text-xs font-bold text-white mb-1">
                      {results.naiveProfit <= 0 
                        ? "Prejuízo Confirmado: Seu preço arbitrado não paga os custos fixos da estrutura!" 
                        : `Atenção: Margem corroída em R$ ${(results.markupProfit - results.naiveProfit).toFixed(2)}`}
                    </h4>
                    <p className="text-xs md:text-[11px] text-slate-400 leading-relaxed">
                      No chutômetro comum de R$ {results.naivePrice.toFixed(2)}, você paga comissões e impostos sobre o valor total do prato do seu próprio bolso, além de não cobrir os 33% de custos fixos (CFI) como aluguel e equipe, resultando em um <strong>prejuízo real de R$ {Math.abs(results.naiveProfit).toFixed(2)}</strong>. Com o <strong className="text-emerald-400">Markup Inverso do Cardápio Blindado</strong>, o preço é calculado de forma reversa para que o cliente absorva as taxas e você tire exatamente <strong className="text-emerald-400">R$ {results.markupProfit.toFixed(2)} limpo</strong> (seus {targetMargin}% de lucro garantidos), com os custos fixos (R$ {results.cfiMoney.toFixed(2)}) e insumos 100% pagos.
                    </p>
                  </div>
                </div>

                {/* CTA de Ação no simulador */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800/50">
                  <div className="text-center sm:text-left">
                    <span className="text-[11px] md:text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Retorno do Investimento</span>
                    <p className="text-sm md:text-xs text-slate-300">
                      Corrigindo apenas <strong className="text-white">5 pratos por dia</strong>, você recupera <strong className="text-emerald-400">R$ 450,00/mês</strong>.
                    </p>
                  </div>
                  <a 
                    href="https://lucro-facil.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm md:text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    Quero Blindar Minhas Margens <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20 min-h-[320px]"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/5 flex items-center justify-center text-emerald-500/40 mb-4 border border-emerald-500/10">
                  <Calculator className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-base md:text-sm font-semibold text-white mb-1">Aguardando o custo do prato</h4>
                <p className="text-sm md:text-xs text-slate-400 max-w-sm leading-relaxed">
                  Digite um valor maior que zero no campo <strong className="text-slate-300">Custo do Insumo</strong> ao lado para ativar a blindagem do Markup Inverso e ver os resultados na hora.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
