import React, { useState } from 'react';
import { Target, Star, ShieldAlert, Award, TrendingUp, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface Product {
  id: string;
  name: string;
  category: 'estrela' | 'cavalo' | 'incognita' | 'abacaxi';
  volume: string;
  margin: string;
  cmv: string;
  xandeAdvice: string;
  icon: any;
  color: string;
  bgClass: string;
  gridPos: { x: number; y: number }; // coordenadas visuais para o gráfico de dispersão (%)
}

const PRODUCTS: Product[] = [
  {
    id: 'hamburguer-gourmet',
    name: 'Hambúrguer Gourmet Double Cheddar',
    category: 'estrela',
    volume: 'Alta Saída (450/mês)',
    margin: 'Alta (28% líquido)',
    cmv: 'CMV Excelente: 24%',
    xandeAdvice: 'Seu prato estrela absoluto! Promova no banner do iFood, treine a equipe para oferecer ativamente no salão e blinde o custo do fornecedor deste blend.',
    icon: Star,
    color: '#10b981',
    bgClass: 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400',
    gridPos: { x: 75, y: 25 }
  },
  {
    id: 'batata-frita-turbinada',
    name: 'Batata Rústica Cheddar & Bacon',
    category: 'cavalo',
    volume: 'Alta Saída (620/mês)',
    margin: 'Baixa (14% líquido)',
    cmv: 'CMV Perigoso: 38%',
    xandeAdvice: 'Muito popular, mas está engolindo sua margem por custos invisíveis de bacon e cheddar de má qualidade. Reajuste R$ 2,00 no preço de venda e monte um Combo Salva-Margem agregando uma bebida de alta margem!',
    icon: Award,
    color: '#3b82f6',
    bgClass: 'bg-blue-500/10 border-blue-500/35 text-blue-400',
    gridPos: { x: 75, y: 75 }
  },
  {
    id: 'petit-gateau',
    name: 'Petit Gateau Artesanal de Doce de Leite',
    category: 'incognita',
    volume: 'Baixa Saída (45/mês)',
    margin: 'Altíssima (42% líquido)',
    cmv: 'CMV Excelente: 18%',
    xandeAdvice: 'Muito lucrativo, mas esquecido pelos clientes. Adicione-o como sobremesa opcional no final da compra (tática de Up-selling) ou ofereça com 10% de desconto no combo para atrair a atenção!',
    icon: Target,
    color: '#eab308',
    bgClass: 'bg-yellow-500/10 border-yellow-500/35 text-yellow-400',
    gridPos: { x: 25, y: 25 }
  },
  {
    id: 'sopa-cebola',
    name: 'Creme de Cebola Imperial (Versão Verão)',
    category: 'abacaxi',
    volume: 'Baixa Saída (15/mês)',
    margin: 'Baixa (9% líquido)',
    cmv: 'CMV Péssimo: 45%',
    xandeAdvice: 'Não tem saída e custa muito caro manter o estoque de creme fresco estragando na geladeira. Elimine este prato imediatamente ou faça uma reformulação total do cardápio sazonal!',
    icon: ShieldAlert,
    color: '#ef4444',
    bgClass: 'bg-red-500/10 border-red-500/35 text-red-400',
    gridPos: { x: 25, y: 75 }
  }
];

export default function MenuEngineering() {
  const [selectedProductId, setSelectedProductId] = useState<string>('hamburguer-gourmet');

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const IconComponent = selectedProduct.icon;

  return (
    <div id="menu-engineering" className="w-full glass-panel rounded-2xl p-6 md:p-8 border border-emerald-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-6">
        <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-md">
          <TrendingUp className="w-5 h-5" />
        </span>
        <div>
          <h3 className="font-display font-bold text-lg text-white">Engenharia de Cardápio (Matriz BCG)</h3>
          <p className="text-xs text-slate-400">Distribua e audite seus pratos automaticamente com base em volume e rentabilidade.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Gráfico de Dispersão Quadrante 2D */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="relative aspect-square w-full bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-hidden flex flex-col justify-between">
            
            {/* Linhas Grid Eixo X e Y */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-slate-800/80 border-dashed" />
              <div className="h-full w-px bg-slate-800/80 border-dashed absolute" />
            </div>

            {/* Labels de Categoria de Fundo nos Quadrantes */}
            <div className="absolute top-3 left-3 text-[10px] font-bold text-slate-600 tracking-wider uppercase">INCÓGNITA (Lucrativo / Pouca Saída)</div>
            <div className="absolute top-3 right-3 text-[10px] font-bold text-emerald-500/50 tracking-wider uppercase text-right">ESTRELA (Sucesso de Caixa)</div>
            <div className="absolute bottom-3 left-3 text-[10px] font-bold text-red-500/50 tracking-wider uppercase">ABACAXI (Prejuízo Invisível)</div>
            <div className="absolute bottom-3 right-3 text-[10px] font-bold text-blue-500/50 tracking-wider uppercase text-right">CAVALO DE BATALHA (Ajustar Preço)</div>

            {/* Indicadores de Eixo */}
            <div className="absolute left-1/2 bottom-1 -translate-x-1/2 text-[9px] text-slate-500 font-mono tracking-widest uppercase">Volume de Vendas ➔</div>
            <div className="absolute top-1/2 left-1 -translate-y-1/2 text-[9px] text-slate-500 font-mono tracking-widest uppercase origin-left rotate-270 -translate-x-3">Margem de Lucro ➔</div>

            {/* Marcadores Interativos */}
            {PRODUCTS.map((prod) => {
              const ProdIcon = prod.icon;
              const isSelected = prod.id === selectedProductId;
              return (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  style={{ left: `${prod.gridPos.x}%`, top: `${prod.gridPos.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-300 z-10 flex items-center justify-center shadow-lg cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-500 text-slate-950 scale-125 ring-4 ring-emerald-500/25' 
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:scale-110 border border-slate-700'
                  }`}
                  title={prod.name}
                >
                  <ProdIcon className="w-4 h-4" />
                </button>
              );
            })}

          </div>

          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2.5">
            <span>*Clique nos ícones do gráfico para analisar o prato</span>
            <span className="text-emerald-400 font-semibold">Exemplo Real de Engenharia de Cardápio</span>
          </div>
        </div>

        {/* Lado Direito: Diagnóstico e Relatório do Xande */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Produto Selecionado</span>
            
            {/* Seletor Rápido em abas verticais */}
            <div className="flex flex-col gap-2">
              {PRODUCTS.map((prod) => {
                const isSelected = prod.id === selectedProductId;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProductId(prod.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-slate-900 border-emerald-500 text-white' 
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`p-1 rounded ${prod.bgClass}`}>
                        <prod.icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-semibold truncate max-w-[180px]">{prod.name}</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold">{prod.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Painel do Relatório do Xande */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> Diagnóstico do Xande IA
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{selectedProduct.cmv}</span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Volume de Vendas:</span>
                  <span className="text-white font-semibold font-mono">{selectedProduct.volume}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Lucro Líquido Real:</span>
                  <span className="text-white font-semibold font-mono">{selectedProduct.margin}</span>
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800 text-[11px] leading-relaxed text-slate-300">
                <strong>Estratégia Recomendada:</strong> {selectedProduct.xandeAdvice}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 flex items-center gap-1 leading-snug">
              <Info className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>O Lucro Fácil recalcula esse mix de saídas todas as noites, cruzando as notas fiscais do seu PDV.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
