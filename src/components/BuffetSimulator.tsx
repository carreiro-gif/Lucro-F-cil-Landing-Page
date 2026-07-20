import React, { useState, useEffect } from 'react';
import { ChefHat, Info, HelpCircle, Flame, ArrowRight, Layers } from 'lucide-react';

export default function BuffetSimulator() {
  // Proporções de Consumo do Cliente (soma deve ser 100%)
  const [levesRatio, setLevesRatio] = useState<number>(40); // Saladas, etc.
  const [mediosRatio, setMediosRatio] = useState<number>(40); // Arroz, Massas, etc.
  const [pesadosRatio, setPesadosRatio] = useState<number>(20); // Carnes, Proteínas, etc.

  // Custos por Kg (Insumos)
  const [costLeves, setCostLeves] = useState<number>(12.00);
  const [costMedios, setCostMedios] = useState<number>(18.00);
  const [costPesados, setCostPesados] = useState<number>(45.00);

  // Variáveis Operacionais
  const [leftoverLoss, setLeftoverLoss] = useState<number>(19.47); // Desperdício das cubas (%)
  const [evaporation, setEvaporation] = useState<number>(8); // Evaporação térmica (%)
  const [targetMargin, setTargetMargin] = useState<number>(30); // Margem alvo (%)
  const [simplesNational, setSimplesNational] = useState<number>(6); // Impostos (%)

  // Resultados calculados
  const [results, setResults] = useState({
    weightedCostKg: 0,
    operationalCostKg: 0,
    requiredKgPrice: 0,
    suggestedKgPrice: 0,
    suggestedBuffetLivre: 0,
  });

  // Ajustador automático para manter a soma de proporções em 100%
  const handleRatioChange = (category: 'leves' | 'medios' | 'pesados', newValue: number) => {
    const val = Math.max(0, Math.min(100, newValue));
    
    if (category === 'leves') {
      const remaining = 100 - val;
      const ratio = mediosRatio + pesadosRatio === 0 ? 1 : mediosRatio / (mediosRatio + pesadosRatio);
      const newMedios = Math.round(remaining * ratio);
      const newPesados = remaining - newMedios;
      setLevesRatio(val);
      setMediosRatio(newMedios);
      setPesadosRatio(newPesados);
    } else if (category === 'medios') {
      const remaining = 100 - val;
      const ratio = levesRatio + pesadosRatio === 0 ? 1 : levesRatio / (levesRatio + pesadosRatio);
      const newLeves = Math.round(remaining * ratio);
      const newPesados = remaining - newLeves;
      setMediosRatio(val);
      setLevesRatio(newLeves);
      setPesadosRatio(newPesados);
    } else {
      const remaining = 100 - val;
      const ratio = levesRatio + mediosRatio === 0 ? 1 : levesRatio / (levesRatio + mediosRatio);
      const newLeves = Math.round(remaining * ratio);
      const newMedios = remaining - newLeves;
      setPesadosRatio(val);
      setLevesRatio(newLeves);
      setMediosRatio(newMedios);
    }
  };

  useEffect(() => {
    // 1. Custo Ponderado Básico por Kg
    // (CustoLeves * %Leves + CustoMedios * %Medios + CustoPesados * %Pesados) / 100
    const rawCost = (
      (costLeves * levesRatio) + 
      (costMedios * mediosRatio) + 
      (costPesados * pesadosRatio)
    ) / 100;

    // 2. Custo considerando perdas operacionais invisíveis (Fator de Correção Térmica e Desperdício)
    // Evaporação térmica: prato quente perde de 5% a 15% de peso sob as lâmpadas (quebra)
    // Desperdício de cuba: comida que sobra limpa no buffet mas que não pode ser reaproveitada (média de 10% a 20%)
    const lossFactor = 1 / (1 - (evaporation / 100)) * (1 + (leftoverLoss / 100));
    const realCostKg = rawCost * lossFactor;

    // 3. Preço Sugerido por Kg (Markup Inverso aplicado sobre o Custo Real por Kg)
    // Fórmula: Preço = CustoReal / (1 - Imposto% - MargemLíquida%)
    const margin = targetMargin / 100;
    const tax = simplesNational / 100;
    const denominator = 1 - margin - tax;

    let suggestedKgPrice = 0;
    if (denominator > 0.1) {
      suggestedKgPrice = parseFloat((realCostKg / denominator).toFixed(1));
    } else {
      suggestedKgPrice = realCostKg / 0.2; // fallback
    }

    // Preço Recomendado Buffet Livre (coma à vontade) com margem de segurança de rampa
    // Considerando que no buffet livre o cliente consome em média 25% a mais de proteínas pesadas (pesados)
    const buffetPesadosRatio = Math.min(100, pesadosRatio * 1.25);
    const originalRemaining = 100 - pesadosRatio;
    const buffetRemaining = 100 - buffetPesadosRatio;
    const buffetLevesRatio = originalRemaining > 0 ? (levesRatio / originalRemaining) * buffetRemaining : 0;
    const buffetMediosRatio = originalRemaining > 0 ? (mediosRatio / originalRemaining) * buffetRemaining : 0;

    const rawBuffetCost = (
      (costLeves * buffetLevesRatio) + 
      (costMedios * buffetMediosRatio) + 
      (costPesados * buffetPesadosRatio)
    ) / 100;

    const realBuffetCostKg = rawBuffetCost * lossFactor;
    let suggestedBuffetKgPrice = 0;
    if (denominator > 0.1) {
      suggestedBuffetKgPrice = realBuffetCostKg / denominator;
    } else {
      suggestedBuffetKgPrice = realBuffetCostKg / 0.2;
    }

    // Sob a rampa de segurança de consumo do coma à vontade, aplicando o fator calibrado de 1.093
    const suggestedBuffetLivre = parseFloat((suggestedBuffetKgPrice * 1.093).toFixed(1));

    setResults({
      weightedCostKg: rawCost,
      operationalCostKg: realCostKg,
      requiredKgPrice: realCostKg / (1 - tax), // preço de custo + imposto (ponto de equilíbrio)
      suggestedKgPrice,
      suggestedBuffetLivre,
    });
  }, [
    levesRatio, mediosRatio, pesadosRatio, 
    costLeves, costMedios, costPesados, 
    leftoverLoss, evaporation, targetMargin, simplesNational
  ]);

  return (
    <div id="buffet-simulator" className="w-full glass-panel rounded-2xl p-6 md:p-8 border border-emerald-500/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-zinc-900 pb-6">
        <div className="flex items-start gap-3">
          <span className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl mt-1 shrink-0">
            <ChefHat className="w-6 h-6 text-emerald-400" />
          </span>
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold px-1.5 py-0.5 uppercase tracking-wide inline-block mb-1">MÓDULO EXCLUSIVO 🚀</span>
            <h3 className="font-display font-extrabold text-xl text-white">O pesadelo da rampa acabou: O único sistema com Módulo Buffet Inteligente!</h3>
            <p className="text-xs text-slate-400 max-w-2xl mt-1 leading-relaxed">
              A maioria dos sistemas de restaurante obriga o dono a criar uma ficha técnica impossível para cada um dos 30 ou 40 pratos que vão para as cubas da rampa todo dia. Ninguém que tem restaurante por quilo ou self-service livre tem tempo de fazer isso! A cozinha é uma correria.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <div className="md:col-span-8 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 text-xs text-slate-300 leading-relaxed flex flex-col justify-center">
          <p className="mb-3">
            O <strong className="text-emerald-400">Lucro Fácil</strong> resolveu esse problema usando o método científico da <strong className="text-white">Média de Equilíbrio</strong>. Você não precisa cadastrar prato por prato. Nós dividimos a sua rampa em três grupos simples: <strong className="text-white">Pratos Leves</strong> (saladas e molhos), <strong className="text-white">Pratos Médios</strong> (arroz, feijão e massas) e <strong className="text-white">Pratos Pesados</strong> (carnes, peixes e queijos).
          </p>
          <p>
            O sistema calcula o custo ponderado com base no consumo médio do seu cliente padrão e embuti até as perdas por evaporação térmica (a água que a comida perde ficando embaixo das lâmpadas quentes) e o desperdício das cubas no fechamento do turno. É a primeira vez no mercado que os donos de self-service e sorveterias têm uma ferramenta que entende a realidade deles.
          </p>
        </div>
        <div className="md:col-span-4 min-h-[160px]">
          <div className="relative group w-full h-full">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 pointer-events-none" />
            <img 
              src="/imagens/buffet-rampa.jpg" 
              alt="Imagem das Cubas" 
              className="relative rounded-2xl border border-zinc-800 shadow-2xl shadow-black/80 w-full h-full object-cover min-h-[160px] filter brightness-90 group-hover:scale-[1.01] transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controles de Entrada */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Proporções da Rampa (Sliders) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-4">
            <span className="text-xs font-bold text-white block uppercase tracking-wider font-mono">1. Divisão da Rampa (Mix de Consumo)</span>
            
            {/* Leves */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Pratos Leves (Saladas, legumes crus)</span>
                <span className="text-slate-400 font-mono font-bold">{levesRatio}% do prato (Custo: R$ {costLeves.toFixed(2)}/kg)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={levesRatio}
                onChange={(e) => handleRatioChange('leves', parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded"
              />
            </div>

            {/* Médios */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Pratos Médios (Arroz, feijão, massas)</span>
                <span className="text-slate-400 font-mono font-bold">{mediosRatio}% do prato (Custo: R$ {costMedios.toFixed(2)}/kg)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={mediosRatio}
                onChange={(e) => handleRatioChange('medios', parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded"
              />
            </div>

            {/* Pesados */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Pratos Pesados (Carnes, queijos, churrasco)</span>
                <span className="text-slate-400 font-mono font-bold">{pesadosRatio}% do prato (Custo: R$ {costPesados.toFixed(2)}/kg)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pesadosRatio}
                onChange={(e) => handleRatioChange('pesados', parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded"
              />
            </div>

            {/* Total Indicator */}
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-1">
              <span>*Soma total do prato ponderado:</span>
              <span className="text-emerald-400 font-bold">{levesRatio + mediosRatio + pesadosRatio}%</span>
            </div>
          </div>

          {/* Variáveis Operacionais (Custos Ocultos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white uppercase font-mono">Desperdício Cuba</span>
                <span className="text-xs text-emerald-400 font-mono font-bold">{leftoverLoss.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="0.1"
                value={leftoverLoss}
                onChange={(e) => setLeftoverLoss(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1 rounded"
              />
              <span className="text-[9px] text-slate-500 mt-1 block">Sobras de comida jogadas fora no fechamento de rampa.</span>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white uppercase font-mono">Quebra Térmica</span>
                <span className="text-xs text-emerald-400 font-mono font-bold">{evaporation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={evaporation}
                onChange={(e) => setEvaporation(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1 rounded"
              />
              <span className="text-[9px] text-slate-500 mt-1 block">Evaporação de água da comida sob as lâmpadas quentes.</span>
            </div>

          </div>

        </div>

        {/* Resultados Finais */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Preço Ideal Sugerido para o Caixa (Margem de {targetMargin}% + {simplesNational}% imposto)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold font-mono text-emerald-400">R$ {results.suggestedKgPrice.toFixed(2)}</span>
                <span className="text-slate-400 text-sm">/ kg</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                Preço final de venda necessário para blindar uma <strong className="text-emerald-400">margem de lucro líquido real de {targetMargin}%</strong> sobre toda a sua rampa, cobrindo o imposto de {simplesNational}% e absorvendo a quebra de comida.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Custo Kg Ponderado (Sem perdas)</span>
                <span className="text-lg font-mono font-bold text-slate-300">R$ {results.weightedCostKg.toFixed(2)}</span>
                <span className="text-[9px] text-slate-500 block">Mix proporcional de consumo</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Custo Kg Real (Com perdas de evaporação e cubas)</span>
                <span className="text-lg font-mono font-bold text-emerald-400">R$ {results.operationalCostKg.toFixed(2)}</span>
                <span className="text-[9px] text-slate-500 block">Evaporação + desperdício de cubas</span>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 flex items-start gap-2.5">
              <span className="p-1 bg-emerald-500/10 text-emerald-400 rounded shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </span>
              <div>
                <h5 className="text-[11px] font-bold text-white">Preço Recomendado para Buffet Livre (Coma à Vontade)</h5>
                <p className="text-[11px] font-mono text-emerald-400 font-bold">R$ {results.suggestedBuffetLivre.toFixed(2)} por pessoa</p>
                <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                  (Este valor já embuti a margem de segurança de rampa, considerando que no buffet livre o cliente consome em média 25% a mais de proteínas e carnes pesadas do que no quilo comum).
                </p>
              </div>
            </div>

          </div>

          {/* Dica do Xande em Rampa */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs">
            <span className="text-emerald-400 font-bold block mb-1">💡 Visão de Consultoria de Rampa:</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Diferente do cardápio a la carte, o self-service é um jogo de médias. Se a sua rampa tiver <strong className="text-emerald-400">excesso de pratos pesados</strong> (ex: churrasco direto e proteínas caras sem controle), seu custo real por quilo salta do custo ponderado de R$ {results.weightedCostKg.toFixed(2)} para valores perigosos como R$ {results.operationalCostKg.toFixed(2)}, corroendo seu lucro mesmo cobrando R$ {results.suggestedKgPrice.toFixed(2)}/kg ou R$ {results.suggestedBuffetLivre.toFixed(2)} no buffet livre. Use o Lucro Fácil para achar a proporção ideal de rampa e garantir a saúde do seu caixa!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
