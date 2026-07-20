import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Calculator, 
  Bot, 
  ChefHat, 
  Check, 
  HelpCircle, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  DollarSign, 
  Menu, 
  X, 
  Sparkles, 
  Lock,
  Bookmark,
  ChevronDown,
  ExternalLink,
  ChevronRight,
  Shield,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Importando componentes interativos premium
import InteractiveCalculator from './components/InteractiveCalculator';
import XandeChatDemo from './components/XandeChatDemo';
import BuffetSimulator from './components/BuffetSimulator';
import MenuEngineering from './components/MenuEngineering';
import PrecoPerfeitoPlayground from './components/PrecoPerfeitoPlayground';

// FAQ Item Interface
interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "O que é de fato a fórmula de Markup Inverso e por que a conta normal dá prejuízo?",
    answer: "A conta normal (regra de três) soma as comissões direto ao custo do prato. Só que as plataformas de entrega cobram a porcentagem deles em cima do valor total da venda (preço cheio faturado). O Markup Inverso faz o cálculo de trás para frente, descontando taxas, impostos e margem do preço de venda teórico. Isso garante que o cliente pague as taxas do iFood de forma transparente e o seu lucro líquido permaneça 100% intacto no bolso."
  },
  {
    question: "Eu tenho restaurante de quilo (self-service). Como o Lucro Fácil ajuda a minha rampa?",
    answer: "Nós criamos o exclusivo Módulo Buffet por Média de Equilíbrio. Você não precisa cadastrar receita por receita na correria da cozinha. Você divide sua rampa entre pratos leves (saladas), médios (arroz, massas, guarnições) e pesados (carnes, churrasco, proteínas). O sistema calcula a média ponderada do consumo dos clientes, embutindo até mesmo a perda de água (evaporação térmica sob as lâmpadas) e desperdício de cubas para te entregar o preço exato do quilo ideal."
  },
  {
    question: "Meus dados financeiros e de cardápio estão seguros com o Xande IA?",
    answer: "Totalmente seguros. A nossa arquitetura utiliza travas de segurança e isolamento de banco de dados por usuário criptografado (Google Firebase Firestore). Seus dados financeiros de filiais, insumos e receitas são privados e restritos. O Xande lê o contexto de forma sensível à tela em tempo real para gerar insights práticos, mas as informações são estritamente suas."
  },
  {
    question: "Preciso colocar cartão de crédito para testar? E se eu não gostar?",
    answer: "Não precisa de nenhum dado de cartão de crédito para testar. Você cria sua conta em menos de 3 minutos usando apenas seu e-mail e começa a blindar seus pratos no mesmo instante. Se após os 14 dias de teste gratuito você achar que a ferramenta não serve para o seu restaurante, basta não prosseguir com a assinatura. Não há contratos ocultos nem multas."
  }
];

interface CopyDishItem {
  shortName: string;
  name: string;
  base: string;
  ifoodBasic: string;
  ifoodSmart: string;
  food99: string;
  keeta: string;
}

const MOCK_COPY_DISHES: CopyDishItem[] = [
  {
    shortName: "Smash Burguer",
    name: "Smash Burguer Duplo",
    base: "R$ 28,00",
    ifoodBasic: "R$ 36,36",
    ifoodSmart: "R$ 38,89",
    food99: "R$ 35,90",
    keeta: "R$ 34,15"
  },
  {
    shortName: "Pizza Calabresa",
    name: "Pizza Calabresa Família",
    base: "R$ 59,00",
    ifoodBasic: "R$ 76,62",
    ifoodSmart: "R$ 81,94",
    food99: "R$ 75,64",
    keeta: "R$ 71,95"
  },
  {
    shortName: "Combinado Sushi",
    name: "Combinado Sushi Premium",
    base: "R$ 89,00",
    ifoodBasic: "R$ 115,58",
    ifoodSmart: "R$ 123,61",
    food99: "R$ 114,10",
    keeta: "R$ 108,54"
  }
];

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [activeDemoTab, setActiveDemoTab] = useState<'markup' | 'xande' | 'buffet' | 'bcg'>('markup');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Estados para a Tabela de Copiar e Colar Interativa
  const [selectedDishIndex, setSelectedDishIndex] = useState<number>(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyText = (text: string, fieldId: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedField(fieldId);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  // Toggle FAQ Accordion
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden relative">
      
      {/* Background radial glowing gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[400px] left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* HEADER / NAVBAR */}
      <nav id="header-nav" className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-emerald-500/5 border border-emerald-500/20 relative w-9 h-9">
                <Shield className="w-5 h-5 text-emerald-400" />
                <Coins className="w-3 h-3 text-emerald-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white tracking-tight">Lucro Fácil</span>
                <span className="text-[9px] font-mono text-emerald-400 block -mt-1 font-bold tracking-widest">FOOD SERVICE</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors tracking-wide">Dores da Rampa</a>
              <a href="#playground" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors tracking-wide">Simulador Ativo</a>
              <a href="#pricing" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors tracking-wide">Planos</a>
              <a href="#faq" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors tracking-wide">Dúvidas</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#playground" className="text-xs font-bold text-slate-400 hover:text-white transition-colors font-mono">
                VER DEMO
              </a>
              <a 
                href="https://lucro-facil.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-transparent border border-emerald-500/80 hover:bg-emerald-500/10 text-emerald-400 font-bold text-xs rounded-lg transition-all shadow-md shadow-emerald-500/5 flex items-center gap-1"
              >
                Criar Conta Grátis
              </a>
            </div>

            {/* Mobile Hamburger menu trigger */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-900 px-4 py-5 space-y-3">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-emerald-400 py-1 font-medium">Dores da Rampa</a>
            <a href="#playground" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-emerald-400 py-1 font-medium">Simulador Ativo</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-emerald-400 py-1 font-medium">Planos de Assinatura</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-emerald-400 py-1 font-medium">Dúvidas Frequentes</a>
            <div className="pt-3 border-t border-slate-900 flex flex-col gap-2">
              <a 
                href="https://lucro-facil.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl block"
              >
                Testar 14 Dias Grátis
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge Alerta Piscando */}
          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-950/40 text-cyan-400 text-sm md:text-xs font-bold rounded-lg border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] mb-8 font-mono tracking-wider">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            <span>Módulo de Buffet Inteligente 🍲 e Xande IA já estão no ar!</span>
          </div>

          {/* Headline Principal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight mb-6">
            Pare de trabalhar duro só para pagar as taxas dos aplicativos de entrega.
          </h1>

          {/* Subheadline persuasiva */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            60% dos negócios de comida fecham as portas antes de completar 5 anos porque precificam no puro "chutômetro". O <strong className="text-emerald-400 font-semibold">Lucro Fácil</strong> é o seu consultor financeiro de bolso. Ele calcula o preço certo contra as taxas abusivas, acha os custos escondidos e protege o dinheiro do seu caixa em tempo real.
          </p>

          {/* CTAs Principais */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14 max-w-md mx-auto sm:max-w-none">
            <a 
              href="https://lucro-facil.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 flex items-center justify-center gap-2 group cursor-pointer"
            >
              🚀 Começar Meu Teste de 14 Dias Grátis
            </a>
            <a 
              href="#playground"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-950 border border-white hover:bg-white/5 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Testar Simuladores Ativos
            </a>
          </div>

          {/* Imagem do Sistema com efeito Neon de fundo */}
          <div className="relative max-w-4xl mx-auto mb-16 group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
            <img 
              src="/imagens/hero-sistema.jpg" 
              alt="Sistema Lucro Fácil Food Service" 
              className="relative rounded-2xl border border-zinc-800 shadow-2xl shadow-black/90 w-full object-cover max-h-[480px] filter brightness-95 contrast-105 group-hover:scale-[1.005] transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Frases de Confiança pequenas */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs md:text-[11px] text-slate-400 font-mono font-medium pb-16 border-b border-zinc-900 max-w-4xl mx-auto">
            <span className="flex items-center gap-1.5">
              <span className="text-red-400 font-bold">❌</span> Não pede cartão de crédito no cadastro.
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">⏱️</span> Fica pronto e configurado em apenas 3 minutos.
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">📱</span> Funciona perfeitamente com iFood, 99Food e Keeta.
            </span>
          </div>

        </div>
      </section>

      {/* STATS ROW (NÚMEROS DE RESPEITO) */}
      <section className="-mt-10 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-lg shadow-black/40">
          <div className="space-y-1.5 p-4 rounded-xl hover:bg-zinc-900/40 transition-colors">
            <span className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-emerald-400 block animate-pulse">R$ 12 Milhões+</span>
            <span className="text-[11px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold font-mono mt-1 block">Lucro Recuperado do Delivery</span>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl hover:bg-zinc-900/40 transition-colors">
            <span className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-emerald-400 block">34.2%</span>
            <span className="text-[11px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold font-mono mt-1 block">Aumento Médio de Margem</span>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl hover:bg-zinc-900/40 transition-colors">
            <span className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-white block">1.800+</span>
            <span className="text-[11px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold font-mono mt-1 block">Restaurantes Protegidos</span>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl hover:bg-zinc-900/40 transition-colors">
            <span className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-cyan-400 block">{"< 1%"}</span>
            <span className="text-[11px] md:text-[10px] text-slate-400 uppercase tracking-wider font-bold font-mono mt-1 block font-mono">Desperdício Médio de Rampa</span>
          </div>
        </div>
      </section>

      {/* THE DURA REALIDADE DAS COZINHAS */}
      <section id="features" className="py-20 md:py-28 relative bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm md:text-xs text-red-500 font-extrabold uppercase tracking-widest font-mono block mb-2">A DURA REALIDADE</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white">
              Por que tantos restaurantes chegam a faturar alto, mas o dono termina o mês sem um centavo no bolso?
            </h2>
            <p className="text-slate-400 text-base md:text-sm mt-4 leading-relaxed">
              O problema quase nunca é o sabor do seu prato ou o movimento do salão. O dinheiro some de forma invisível em buracos de precificação que ninguém te ensinou a fechar:
            </p>
          </div>

          {/* CARTÃO DE DESTAQUE: BALDE FURADO */}
          <div className="bg-gradient-to-br from-red-950/15 via-zinc-950 to-zinc-950 border border-red-900/20 rounded-3xl p-6 md:p-10 mb-12 max-w-5xl mx-auto relative overflow-hidden shadow-2xl shadow-black/50">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Coluna da Esquerda: Textos de Dor */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
                    <AlertTriangle className="w-6 h-6 animate-pulse text-red-400" />
                  </span>
                  <span className="text-xs text-red-400 font-bold font-mono uppercase tracking-widest">ALERTA DE SEGURANÇA FINANCEIRA</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                  Vender muito sem o Lucro Fácil é igual a tentar encher um balde furado!
                </h3>
                
                <p className="text-sm md:text-xs text-slate-300 leading-relaxed">
                  Você já passou pela frustração de ter um final de semana com a cozinha lotada, motoboy saindo toda hora, equipe exausta, rache de faturamento... e quando chega na segunda-feira para olhar a conta do banco, ela está zerada?
                </p>
                
                <p className="text-sm md:text-xs text-slate-300 leading-relaxed">
                  Não adianta inventar promoção maluca, atrair novos clientes ou gastar rios de dinheiro com panfletos e anúncios se o seu restaurante for um balde furado. O dinheiro está entrando pela boca do balde e vazando pelos furos invisíveis das taxas dos marketplaces, do frete bitributado e do desperdício de insumos na cozinha.
                </p>
                
                <p className="text-sm md:text-xs text-slate-400 pt-3 border-t border-zinc-900">
                  O <strong className="text-emerald-400 font-semibold">Lucro Fácil</strong> não foi feito para você vender mais comida; foi feito para fazer o dinheiro sobrar. Nós tapamos os furos da sua precificação logo na primeira semana para que cada pedido entregue coloque lucro líquido real dentro do seu caixa.
                </p>
              </div>

              {/* Coluna da Direita: Imagem Ilustrativa */}
              <div className="lg:col-span-5 h-full flex items-center justify-center">
                <div className="relative group w-full">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-red-500/10 to-emerald-500/10 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                  <img 
                    src="/imagens/cozinha-real.jpg" 
                    alt="Operação de Cozinha Real" 
                    className="relative rounded-2xl border border-zinc-800 shadow-2xl shadow-black/80 w-full object-cover h-[280px] md:h-[320px] filter brightness-90 contrast-105 group-hover:scale-[1.01] transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 rounded text-[11px] md:text-[10px] text-slate-400 font-mono border border-zinc-800">
                    Ilustração: Operação de Rampa Real
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Dor 1 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 flex items-start gap-4">
              <span className="p-3 bg-red-500/10 text-red-400 rounded-xl shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-white text-base mb-1.5">O Erro Fatal de Multiplicar por 3</h3>
                <p className="text-sm md:text-xs text-slate-400 leading-relaxed">
                  Achar que multiplicar o custo do ingrediente por 3 resolve tudo é um tiro no pé. As taxas do delivery (que chegam a 28,2%) e os impostos cobram a comissão em cima do preço cheio do prato, e não do que você gastou. No final, você paga para trabalhar sem perceber.
                </p>
              </div>
            </div>

            {/* Dor 2 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 flex items-start gap-4">
              <span className="p-3 bg-red-500/10 text-red-400 rounded-xl shrink-0">
                <DollarSign className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-white text-base mb-1.5">A Taxa Abusiva do Frete</h3>
                <p className="text-sm md:text-xs text-slate-400 leading-relaxed">
                  Os aplicativos cobram a porcentagem de comissão deles em cima do valor total bruto da conta, incluindo o frete que o próprio cliente pagou. Sem o cálculo de Markup Inverso do Lucro Fácil, essa comissão sai direto do seu lucro líquido.
                </p>
              </div>
            </div>

            {/* Dor 3 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 flex items-start gap-4">
              <span className="p-3 bg-red-500/10 text-red-400 rounded-xl shrink-0">
                <ChefHat className="w-5 h-5 text-red-400" />
              </span>
              <div>
                <h3 className="font-bold text-white text-base mb-1.5">O Encolhimento Fantasma: Você está dando comida de graça para o cliente?</h3>
                <p className="text-sm md:text-xs text-slate-400 leading-relaxed mb-2">
                  Quando você compra 10kg de filé de frango ou carne bovina no fornecedor, você paga pelo peso bruto. Mas quando a sua equipe limpa a peça na cozinha, joga fora gordura, osso e nervo. O frango perde peso na limpeza. Depois, quando vai para a chapa ou para o forno, perde água e encolhe ainda mais.
                </p>
                <p className="text-sm md:text-xs text-slate-400 leading-relaxed">
                  Se você monta a sua ficha técnica pesando o ingrediente cru direto da embalagem, a sua conta está errada. O nome disso na gastronomia é <strong className="text-white">Fator de Correção e Índice de Cocção</strong>. No papel ou no Excel, fazer essa conta é uma tortura. No <strong className="text-emerald-400">Lucro Fácil</strong>, você só digita quanto comprou e quanto sobrou após o preparo. O sistema calcula o encolhimento invisível sozinho e ajusta o preço em tempo real.
                </p>
              </div>
            </div>

            {/* Bloco de Texto Atualizado: Controle de CFI (Custos Fixos Integrados) */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 flex items-start gap-4">
              <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0 border border-emerald-500/10">
                <Layers className="w-5 h-5 text-emerald-400" />
              </span>
              <div>
                <span className="text-[10px] md:text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold px-1.5 py-0.5 uppercase tracking-wide inline-block mb-2">RECURSO EXCLUSIVO ⚙️</span>
                <h3 className="font-bold text-white text-base mb-1.5 leading-tight">
                  Conheça o CFI: A engrenagem que calcula os custos fixos e protege o lucro do seu cardápio!
                </h3>
                <div className="text-sm md:text-xs text-slate-400 leading-relaxed space-y-2.5">
                  <p>
                    Você já parou para pensar que o custo real de um prato não é só o arroz, o feijão e a carne? Se o seu restaurante tem aluguel, luz, água, contador, imposto e funcionários para pagar, cada porção de comida que sai da sua cozinha precisa carregar uma "fatiazinha" dessas despesas globais.
                  </p>
                  <p>
                    Se você não dilui esses gastos do jeito certo na hora de dar o preço, você pode vender mil pratos no mês, ter a cozinha lotada e, mesmo assim, faltar dinheiro para pagar os boletos no final do mês.
                  </p>
                  <p>
                    Para resolver esse buraco financeiro, nós criamos a tecnologia de <strong className="text-emerald-400 font-semibold">CFI (Custos Fixos Integrados)</strong>. Você lança as suas despesas mensais em uma tela simples e o nosso motor matemático faz a mágica sozinho: ele distribui o peso dos seus custos fixos milimetricamente dentro do preço sugerido de cada item do cardápio.
                  </p>
                  <p className="text-slate-300">
                    Quando você bota o preço na sua loja física, no balcão ou no salão, você tem a certeza absoluta de que aquele valor cobre o ingrediente, a taxa, o imposto e ainda paga o aluguel da casa! É o controle total da sua rampa, sem planilhas chatas e sem adivinhação.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INTRODUZINHO O COPILOTO XANDE IA */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden border-t border-zinc-900 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_70%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            
            {/* Esquerda: Conteúdo persuasivo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/15 text-cyan-400 text-sm md:text-xs font-semibold rounded-full border border-cyan-500/20 font-mono">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>XANDE IA: CONSULTOR FINANCEIRO DE BOLSO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                Conheça o Xande: Seu Consultor Financeiro de Bolso
              </h2>
              <p className="text-sm md:text-xs text-slate-300 leading-relaxed">
                O Xande não vai te mostrar gráficos frios e cheios de termos de contador que te deixam com dor de headache. Ele conversa com você por escrito. Veja um exemplo real de como ele salva a sua operação no dia a dia:
              </p>

              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-3.5 text-sm md:text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-slate-300 font-mono block">Você digita:</span>
                  <p className="text-slate-400 italic">
                    "Xande, o preço do quilo do queijo muçarela subiu 15% no meu fornecedor hoje. O que eu faço?"
                  </p>
                </div>
                
                <div className="pt-3 border-t border-zinc-800/80 space-y-1">
                  <span className="font-bold text-cyan-400 font-mono flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" /> O Xande responde em segundos:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    "Já identifiquei aqui! Não altere o preço da sua pizza correndo para não assustar o cliente. Como o queijo subiu, eu já recalculei todas as suas receitas em cascata. Minha sugestão é você usar a ferramenta de <strong className="text-cyan-400 font-semibold">Combos Smart Offers</strong>: monte um combo da sua pizza campeã de vendas com aquela sobremesa paralisada no estoque que tem margem alta. Isso vai diluir o custo do queijo e manter o seu lucro intocado sem mexer no preço final da pizza sozinha!"
                  </p>
                </div>
              </div>
            </div>

            {/* Direita: Preview Visual do Xande */}
            <div className="lg:col-span-7">
              <XandeChatDemo />
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO PROVA REAL: ATÉ O PRÓPRIO IFOOD AVISA */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-zinc-950 border border-emerald-500/20 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl shadow-emerald-950/5">
            {/* Soft decorative light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Coluna da Esquerda: Textos de Dor e Conteúdo */}
              <div className="lg:col-span-12 space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/20 font-mono uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-red-400" /> Alerta Oficial
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                    Até o próprio iFood já assumiu publicamente: <br />
                    <span className="text-emerald-400 font-extrabold font-display">você está calculando seu preço errado!</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Não é conversa de consultor. É um fato de sobrevivência na cozinha do delivery.
                  </p>
                </div>

                <div className="space-y-4 text-sm md:text-xs leading-relaxed text-slate-300">
                  <p>
                    Não é conversa fiada de consultor. O próprio blog oficial do iFood mantém uma calculadora de preços porque eles cansaram de ver restaurantes fechando as portas por pura falta de lucro. Eles deixam claro em letras garrafais: <strong className="text-white">somar a taxa do aplicativo direto no preço do custo do prato está errado e vai quebrar o seu negócio</strong>.
                  </p>
                  
                  <p>
                    Como o aplicativo morde a comissão em cima do valor total da conta (incluindo o frete e os cupons que o cliente usou), uma bobeira de cálculo em um prato que você vende por R$ 50,00 faz você perder <strong className="text-white">R$ 3,43 por pedido</strong> sem perceber.
                  </p>

                  <p>
                    Se você faz 500 pedidos no mês, são <strong className="text-emerald-400">R$ 1.715,00 jogados no lixo todo santo mês</strong>. Esse dinheiro sai direto do lucro que deveria ir para o seu bolso, para pagar o aluguel da sua casa ou para trocar de carro.
                  </p>

                  <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
                    <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest block">O Gargalo da Ferramenta Gratuita:</span>
                    <p className="text-sm md:text-xs text-slate-400 leading-relaxed italic">
                      "Mas a calculadora gratuita do iFood tem um problema crônico: ela é burra. Ela não salva seus dados, você tem que preencher tudo na mão toda vez, dá um trabalho danado e só serve para o iFood."
                    </p>
                  </div>

                  <p className="text-sm md:text-xs text-slate-400">
                    É por isso que nós criamos o <strong className="text-emerald-400">Lucro Fácil</strong>. Nós pegamos essa mesma lógica matemática rigorosa e automatizamos tudo. Você joga seus ingredientes uma vez só e o sistema calcula a blindagem em milissegundos não só para o iFood, mas também para a 99Food e para a Keeta. Tudo salvo, seguro e atualizado em cascata.
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center gap-3">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Fonte Oficial</span>
                    <span className="text-[11px] md:text-[10px] text-slate-500 block">Portal do Parceiro iFood</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 1. SEÇÃO: TABELA DE COPIAR E COLAR */}
      <section className="py-20 md:py-24 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Coluna da Esquerda: Textos de Dor e Conteúdo */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm md:text-xs font-bold rounded-lg border border-emerald-500/20 font-mono uppercase tracking-wider">
                  ⚡ O Fim do Trabalho Manual
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                  A "Tabela de Copiar e Colar": Tenha o mesmo lucro na loja física e nos aplicativos sem fazer nenhuma conta!
                </h2>
              </div>

              <div className="space-y-4 text-sm md:text-xs leading-relaxed text-slate-300">
                <p>
                  Chega de passar o dia inteiro quebrando a cabeça com contas diferentes para cada aplicativo de entrega. No Lucro Fácil, nós criamos a ferramenta mais simples e poderosa do mercado: a Tabela de Copiar e Colar.
                </p>
                <p>
                  Funciona assim: você seleciona o prato e o sistema te dá, em uma única linha na tela, o preço exato que você deve cobrar em cada lugar:
                </p>
                
                {/* Seleção Interativa do Prato */}
                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 space-y-4 my-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800/60">
                    <span className="text-sm md:text-xs text-slate-400 font-mono font-medium">Selecione um prato para simular:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {MOCK_COPY_DISHES.map((dish, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDishIndex(idx)}
                          className={`px-3 py-1.5 rounded-lg text-sm md:text-xs font-bold transition-all border cursor-pointer ${
                            selectedDishIndex === idx
                              ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-semibold shadow-md shadow-emerald-500/10'
                              : 'bg-zinc-950 text-slate-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          {idx === 0 ? '🍔' : idx === 1 ? '🍕' : '🍣'} {dish.shortName}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] md:text-[10px] text-slate-500 font-mono uppercase tracking-wider block font-bold">Preços Blindados Gerados na Tela:</span>
                    
                    {/* Linha 1: Loja Física */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">💰</span>
                        <span className="text-sm md:text-xs font-semibold text-slate-300">Quanto cobrar na sua Loja Física / Balcão:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-xs font-bold text-emerald-400 font-mono">{MOCK_COPY_DISHES[selectedDishIndex].base}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(MOCK_COPY_DISHES[selectedDishIndex].base, `base-${selectedDishIndex}`)}
                          className="px-2.5 py-1 text-[11px] md:text-[10px] bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-zinc-800 rounded hover:border-emerald-500/40 font-semibold cursor-pointer transition-all"
                        >
                          {copiedField === `base-${selectedDishIndex}` ? 'Copiado! ✓' : 'Copiar 📋'}
                        </button>
                      </div>
                    </div>

                    {/* Linha 2: iFood Básico */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">🛵</span>
                        <span className="text-sm md:text-xs font-semibold text-slate-300">Quanto cobrar no iFood (Plano Básico):</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-xs font-bold text-white font-mono">{MOCK_COPY_DISHES[selectedDishIndex].ifoodBasic}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(MOCK_COPY_DISHES[selectedDishIndex].ifoodBasic, `basic-${selectedDishIndex}`)}
                          className="px-2.5 py-1 text-[11px] md:text-[10px] bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-zinc-800 rounded hover:border-emerald-500/40 font-semibold cursor-pointer transition-all"
                        >
                          {copiedField === `basic-${selectedDishIndex}` ? 'Copiado! ✓' : 'Copiar 📋'}
                        </button>
                      </div>
                    </div>

                    {/* Linha 3: iFood Campanha Inteligente */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">🚀</span>
                        <span className="text-sm md:text-xs font-semibold text-slate-300">Quanto cobrar no iFood (Com Campanha Inteligente):</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-xs font-bold text-white font-mono">{MOCK_COPY_DISHES[selectedDishIndex].ifoodSmart}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(MOCK_COPY_DISHES[selectedDishIndex].ifoodSmart, `smart-${selectedDishIndex}`)}
                          className="px-2.5 py-1 text-[11px] md:text-[10px] bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-zinc-800 rounded hover:border-emerald-500/40 font-semibold cursor-pointer transition-all"
                        >
                          {copiedField === `smart-${selectedDishIndex}` ? 'Copiado! ✓' : 'Copiar 📋'}
                        </button>
                      </div>
                    </div>

                    {/* Linha 4: 99Food */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">🔴</span>
                        <span className="text-sm md:text-xs font-semibold text-slate-300">Quanto cobrar na 99Food:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-xs font-bold text-white font-mono">{MOCK_COPY_DISHES[selectedDishIndex].food99}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(MOCK_COPY_DISHES[selectedDishIndex].food99, `99food-${selectedDishIndex}`)}
                          className="px-2.5 py-1 text-[11px] md:text-[10px] bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-zinc-800 rounded hover:border-emerald-500/40 font-semibold cursor-pointer transition-all"
                        >
                          {copiedField === `99food-${selectedDishIndex}` ? 'Copiado! ✓' : 'Copiar 📋'}
                        </button>
                      </div>
                    </div>

                    {/* Linha 5: Keeta */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">🔵</span>
                        <span className="text-sm md:text-xs font-semibold text-slate-300">Quanto cobrar na Keeta:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-xs font-bold text-white font-mono">{MOCK_COPY_DISHES[selectedDishIndex].keeta}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(MOCK_COPY_DISHES[selectedDishIndex].keeta, `keeta-${selectedDishIndex}`)}
                          className="px-2.5 py-1 text-[11px] md:text-[10px] bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-zinc-800 rounded hover:border-emerald-500/40 font-semibold cursor-pointer transition-all"
                        >
                          {copiedField === `keeta-${selectedDishIndex}` ? 'Copiado! ✓' : 'Copiar 📋'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p>
                  O motor matemático do Lucro Fácil faz todo o cálculo reverso em milissegundos. Tudo o que você precisa fazer é olhar para a tela, copiar o preço sugerido e colar dentro do seu aplicativo.
                </p>
                <p>
                  Pronto! Você tem a garantia matemática de que vai colocar no seu bolso o mesmíssimo lucro líquido, não importa se o cliente comprou sentado na mesa do seu salão ou pelo delivery da Keeta. O aplicativo não morde mais nem um centavo do seu suor.
                </p>
              </div>
            </div>

            {/* Coluna da Direita: Imagem Ilustrativa */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative group w-full">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <img 
                  src="/imagens/tabela-precos.jpg" 
                  alt="Tabela de Copiar e Colar" 
                  className="relative rounded-2xl border border-zinc-800 shadow-2xl shadow-black/80 w-full object-cover h-[280px] md:h-[360px] filter brightness-90 contrast-105 group-hover:scale-[1.01] transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 rounded text-[11px] md:text-[10px] text-slate-400 font-mono border border-zinc-800">
                  Ilustração: Copiar & Colar Preços no Aplicativo
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SEÇÃO: COMO O SISTEMA BLINDA SEU CAIXA */}
      <section className="py-20 md:py-24 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Coluna da Esquerda: Textos de Dor e Conteúdo */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm md:text-xs font-bold rounded-lg border border-emerald-500/20 font-mono uppercase tracking-wider">
                  🛡️ O Segredo do Preço Certo
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                  Como o sistema blinda seu caixa? Conheça a Fórmula do Preço Perfeito
                </h2>
              </div>

              <div className="space-y-4 text-sm md:text-xs leading-relaxed text-slate-300">
                <p>
                  Para o seu restaurante sobrar dinheiro de verdade no fim do mês, o preço de venda na sua loja não pode ser inventado. Ele precisa seguir uma regra rígida baseada em 3 pilares que o Lucro Fácil controla para você:
                </p>
                
                <ul className="space-y-3.5 pl-1 text-sm md:text-xs">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-mono font-bold shrink-0 mt-0.5">CMV:</span>
                    <span>
                      <strong className="text-white">Custo de Mercadoria Vendida:</strong> É o custo milimétrico de tudo o que vai para o prato. O preço do arroz, da carne, do tempero e até o saquinho e a fita da embalagem de entrega.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-mono font-bold shrink-0 mt-0.5">CFI:</span>
                    <span>
                      <strong className="text-white">Custos Fixos Integrados:</strong> É a fatiazinha do seu aluguel, da luz, do funcionário e do contador que cada prato vendido precisa pagar para ajudar a quitar os boletos da empresa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-mono font-bold shrink-0 mt-0.5">LUCRO:</span>
                    <span>
                      <strong className="text-white">O Lucro Escolhido:</strong> É a porcentagem de dinheiro limpo que você quer que sobre na sua mão (ex: 25% de margem livre).
                    </span>
                  </li>
                </ul>

                <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 text-center my-4">
                  <div className="text-[11px] md:text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1.5">FÓRMULA SECRETA DO SALÃO</div>
                  <div className="text-sm sm:text-base font-mono font-bold text-white">
                    CMV + CFI + Lucro Escolhido = <span className="text-emerald-400">Preço de Venda na Loja</span>
                  </div>
                </div>

                <p>
                  E nos Marketplaces (iFood, 99Food, Keeta)? Aí é que a mágica acontece! Você não precisa fazer conta. Você só confere se as porcentagens das taxas das plataformas estão certas na tela e o sistema aplica o Markup Inverso automaticamente, jogando as comissões e impostos para cima do preço final. O cliente absorve a taxa e o seu lucro fica 100% protegido.
                </p>
              </div>
            </div>

            {/* Coluna da Direita: Imagem Ilustrativa */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative group w-full">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <img 
                  src="/imagens/formula-caixa.jpg" 
                  alt="A Fórmula do Preço Perfeito" 
                  className="relative rounded-2xl border border-zinc-800 shadow-2xl shadow-black/80 w-full object-cover h-[280px] md:h-[360px] filter brightness-90 contrast-105 group-hover:scale-[1.01] transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 rounded text-[11px] md:text-[10px] text-slate-400 font-mono border border-zinc-800">
                  Ilustração: A Fórmula do Preço Perfeito
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SEÇÃO: CONTROLE TOTAL DE CMV */}
      <section className="py-20 md:py-24 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Coluna da Esquerda: Textos de Dor e Conteúdo */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm md:text-xs font-bold rounded-lg border border-emerald-500/20 font-mono uppercase tracking-wider">
                  🍳 Controle da Cozinha
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                  Controle Total de CMV: Monitore cada grama, mililitro e embalagem da sua cozinha
                </h2>
              </div>

              <div className="space-y-4 text-sm md:text-xs leading-relaxed text-slate-300">
                <p>
                  O Lucro Fácil tem uma área inteira focada exclusivamente no controle do seu CMV. Chega de ver o dinheiro sumir pelo ralo do desperdício!
                </p>
                <p>
                  Nessa tela simples, você cadastra todos os seus insumos brutos, monta sub-receitas (como o custo exato do seu molho artesanal ou do blend do seu hambúrguer) e adiciona o valor das embalagens, sacolas e guardanapos.
                </p>
                <p>
                  Se o quilo do tomate ou o preço da caixa de entrega subir no fornecedor, você altera o valor apenas uma vez. O sistema roda um efeito cascata que atualiza na hora o CMV e o preço sugerido de todos os itens do cardápio que usam aquele material. Você descobre o custo real da sua rampa num estalo.
                </p>
              </div>
            </div>

            {/* Coluna da Direita: Imagem Ilustrativa */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative group w-full">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <img 
                  src="/imagens/corte-insumo.jpg" 
                  alt="Controle Total de CMV" 
                  className="relative rounded-2xl border border-zinc-800 shadow-2xl shadow-black/80 w-full object-cover h-[280px] md:h-[360px] filter brightness-90 contrast-105 group-hover:scale-[1.01] transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 rounded text-[11px] md:text-[10px] text-slate-400 font-mono border border-zinc-800">
                  Ilustração: Controle Total de CMV
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SEÇÃO: FLUXO DE CAIXA POR ABAS */}
      <section className="py-20 md:py-24 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Coluna da Esquerda: Textos de Dor e Conteúdo */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm md:text-xs font-bold rounded-lg border border-emerald-500/20 font-mono uppercase tracking-wider">
                  📊 Ecossistema Financeiro
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                  Fluxo de Caixa Integrado: Suas Contas a Pagar e Receber organizadas em um clique
                </h2>
              </div>

              <div className="space-y-4 text-sm md:text-xs leading-relaxed text-slate-300">
                <p>
                  O Lucro Fácil é um ecossistema financeiro completo e feito para quem não tempo a perder. Chega de abrir dez planilhas para saber se tem conta vencendo!
                </p>
                <p>
                  O sistema funciona todo dividido em abas separadas e limpas, totalmente integradas com o seu CFI:
                </p>
                
                <ul className="space-y-3.5 pl-1 text-sm md:text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold">📁</span>
                    <span>
                      <strong className="text-white">Aba de Contas a Pagar:</strong> Cadastre seus boletos de fornecedores, parcelas e despesas para nunca mais pagar juros na vida.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold">📁</span>
                    <span>
                      <strong className="text-white">Aba de Contas a Receber:</strong> Acompanhe o dinheiro que vai entrar dos cartões e dos repasses dos aplicativos.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold">📁</span>
                    <span>
                      <strong className="text-white">Aba de Fluxo de Caixa:</strong> Veja o saldo real da sua empresa e saiba exatamente para onde cada centavo está indo.
                    </span>
                  </li>
                </ul>

                <p>
                  Tudo funciona de forma inteligente. Quando você lança uma conta na aba financeira, o sistema já atualiza o cálculo do seu CFI de rampa automaticamente. É a gestão total do seu restaurante organizada de um jeito que até uma criança consegue mexer.
                </p>
              </div>
            </div>

            {/* Coluna da Direita: Imagem Ilustrativa */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative group w-full">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <img 
                  src="/imagens/fluxo-caixa.jpg" 
                  alt="Fluxo de Caixa Integrado" 
                  className="relative rounded-2xl border border-zinc-800 shadow-2xl shadow-black/80 w-full object-cover h-[280px] md:h-[360px] filter brightness-90 contrast-105 group-hover:scale-[1.01] transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 rounded text-[11px] md:text-[10px] text-slate-400 font-mono border border-zinc-800">
                  Ilustração: Fluxo de Caixa Integrado
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: O PLAYGROUND DO PREÇO PERFEITO */}
      <section id="playground-preco-perfeito" className="py-20 md:py-24 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm md:text-xs font-bold rounded-lg border border-emerald-500/20 font-mono uppercase tracking-wider">
              🎮 Interativo
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
              O Playground do Preço Perfeito
            </h2>
            <p className="text-slate-400 text-base md:text-sm max-w-2xl mx-auto leading-relaxed">
              Explore o ecossistema vivo do Lucro Fácil. Monte combos, ajuste custos e comissões, e veja como protegemos sua margem em tempo real.
            </p>
          </div>
          <PrecoPerfeitoPlayground />
        </div>
      </section>

      {/* PLAYGROUND / SIMULADOR INTERATIVO GERAL */}
      <section id="playground" className="py-20 md:py-28 bg-zinc-950 border-y border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm md:text-xs text-emerald-400 font-bold uppercase tracking-widest font-mono block mb-2">PLAYGROUND INTERATIVO</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Veja a diferença matemática entre o Improviso e a Blindagem do Lucro Fácil
            </h2>
            <p className="text-slate-400 text-base md:text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              Clique nas abas abaixo para interagir com o motor matemático do Lucro Fácil e entender como protegemos cada centavo da sua operação de alimentação.
            </p>
          </div>

          {/* Abas de Navegação Premium */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-8 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveDemoTab('markup')}
              className={`px-4 py-3 rounded-xl text-xs font-semibold font-display transition-all flex items-center gap-1.5 border cursor-pointer ${
                activeDemoTab === 'markup' 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/15' 
                  : 'bg-slate-900 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700'
              }`}
            >
              <Calculator className="w-4 h-4" /> Calculadora de Markup Inverso
            </button>

            <button
              onClick={() => setActiveDemoTab('xande')}
              className={`px-4 py-3 rounded-xl text-xs font-semibold font-display transition-all flex items-center gap-1.5 border cursor-pointer ${
                activeDemoTab === 'xande' 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/15' 
                  : 'bg-slate-900 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700'
              }`}
            >
              <Bot className="w-4 h-4" /> Consultor Xande IA de Bolso
            </button>

            <button
              onClick={() => setActiveDemoTab('buffet')}
              className={`px-4 py-3 rounded-xl text-xs font-semibold font-display transition-all flex items-center gap-1.5 border cursor-pointer ${
                activeDemoTab === 'buffet' 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/15' 
                  : 'bg-slate-900 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700'
              }`}
            >
              <ChefHat className="w-4 h-4" /> Módulo Buffet (Restaurantes Quilo)
            </button>

            <button
              onClick={() => setActiveDemoTab('bcg')}
              className={`px-4 py-3 rounded-xl text-xs font-semibold font-display transition-all flex items-center gap-1.5 border cursor-pointer ${
                activeDemoTab === 'bcg' 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/15' 
                  : 'bg-slate-900 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Engenharia BCG de Cardápio
            </button>
          </div>

          {/* Renderização condicional animada */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {activeDemoTab === 'markup' && (
                <motion.div
                  key="markup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <InteractiveCalculator />
                </motion.div>
              )}

              {activeDemoTab === 'xande' && (
                <motion.div
                  key="xande"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="max-w-3xl mx-auto">
                    <XandeChatDemo />
                  </div>
                </motion.div>
              )}

              {activeDemoTab === 'buffet' && (
                <motion.div
                  key="buffet"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <BuffetSimulator />
                </motion.div>
              )}

              {activeDemoTab === 'bcg' && (
                <motion.div
                  key="bcg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuEngineering />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* DIFERENCIAIS DE RAMPA */}
      <section className="py-20 md:py-28 relative bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-emerald-400 font-extrabold uppercase tracking-widest font-mono block mb-2">FEITO PARA O DIA A DIA</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Tecnologia de verdade que aguenta o tranco de uma cozinha real
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Substituímos planilhas complexas por rotinas inteligentes e interativas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Diferencial 1 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all">
              <span className="text-[11px] md:text-[10px] text-emerald-400 font-mono font-bold block mb-1">CÁLCULO EM CASCATA</span>
              <h3 className="font-bold text-white text-base mb-2">Efeito Cascata (Cascade)</h3>
              <p className="text-sm md:text-xs text-slate-400 leading-relaxed">
                O preço do tomate ou do óleo subiu no fornecedor? Mude uma única vez e o sistema atualiza de imediato o custo de todas as pizzas e molhos que levam aquele item.
              </p>
            </div>

            {/* Diferencial 2 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all">
              <span className="text-[11px] md:text-[10px] text-emerald-400 font-mono font-bold block mb-1">AUDITORIA ATIVA</span>
              <h3 className="font-bold text-white text-base mb-2">Alerta do "Campeão Magro"</h3>
              <p className="text-sm md:text-xs text-slate-400 leading-relaxed">
                O prato que você mais vende está com margem baixa de lucro líquido? O sistema te avisa e sugere o reajuste no mesmo instante.
              </p>
            </div>

            {/* Diferencial 3 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all">
              <span className="text-[11px] md:text-[10px] text-emerald-400 font-mono font-bold block mb-1">ESTABILIDADE SENSÍVEL</span>
              <h3 className="font-bold text-white text-base mb-2">Tecnologia que Não Trava</h3>
              <p className="text-sm md:text-xs text-slate-400 leading-relaxed">
                O sistema opera com uma tecnologia ativa que não cai nem desloga, mesmo com a internet oscilando na correria da cozinha.
              </p>
            </div>

            {/* Diferencial 4 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all">
              <span className="text-[11px] md:text-[10px] text-emerald-400 font-mono font-bold block mb-1">INTEGRAÇÃO PIX</span>
              <h3 className="font-bold text-white text-base mb-2">Destravamento via Pix</h3>
              <p className="text-sm md:text-xs text-slate-400 leading-relaxed">
                Ao assinar ou renovar, a liberação de todo o sistema é automática e acontece em menos de um segundo pelo Pix.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* BÔNUS EXCLUSIVO BANNER */}
      <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 border border-emerald-500/30 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-lg shadow-emerald-950/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-start gap-4 flex-1">
            <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl shrink-0 mt-1 hidden sm:block">
              <Bookmark className="w-6 h-6" />
            </span>
            <div>
              <span className="bg-emerald-500/15 text-emerald-400 text-[11px] md:text-[10px] px-2 py-0.5 rounded font-extrabold uppercase font-mono inline-block mb-3.5 border border-emerald-500/30">
                BÔNUS INCLUSO 🎁
              </span>
              <h3 className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                BÔNUS INCLUSO: Guia Estratégico de Combos Salva-Margem 📘
              </h3>
              <p className="text-sm md:text-xs text-slate-400 mt-2 leading-relaxed max-w-xl">
                Aprenda a criar combos inteligentes cruzando o sucesso do prato "Campeão" com a lucratividade do prato "Parado", sem queimar a margem do caixa do restaurante.
              </p>
            </div>
          </div>

          <div className="shrink-0 text-center md:text-right space-y-2">
            <span className="bg-zinc-900 border border-zinc-800 text-sm md:text-xs text-slate-400 px-3 py-1 rounded-full inline-block font-mono">Manual avaliado em R$ 197,00</span>
            <span className="text-xl font-bold text-emerald-400 block font-mono">R$ 0,00 (Totalmente Grátis)</span>
            <span className="text-[11px] md:text-[10px] text-slate-400 block font-medium">Incluso em todos os planos de assinatura.</span>
          </div>
        </div>
      </section>

      {/* PLANOS DE ASSINATURA */}
      <section id="pricing" className="py-20 md:py-28 relative bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs text-emerald-400 font-extrabold uppercase tracking-widest font-mono block mb-2">INVESTIMENTO SEGURO</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Nossos Planos de Assinatura
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Valores pensados para que a plataforma se pague já nas primeiras semanas de uso operacional.
            </p>

            {/* Alternador Mensal / Anual */}
            <div className="flex flex-row items-center justify-center gap-4 mt-8 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`flex-1 py-3.5 px-5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  !isAnnual
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-zinc-900/50 text-slate-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                MENSAL
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`flex-1 py-3.5 px-5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${
                  isAnnual
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-zinc-900/50 text-slate-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <span>ANUAL</span>
                <span className={`text-[10px] md:text-[9px] px-1.5 py-0.5 rounded font-extrabold ${
                  isAnnual 
                    ? 'bg-zinc-950 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  Economize 20%
                </span>
              </button>
            </div>
          </div>

          {/* Cards Grid de Planos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* PLAN 1: STARTER */}
            <div className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between hover:scale-101 transition-all relative">
              <div>
                <span className="text-[11px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">STARTER</span>
                <h3 className="text-lg font-bold text-white mt-1">Restaurantes Iniciantes</h3>
                <p className="text-sm md:text-xs text-slate-400 mt-2">Perfeito para pequenas operações locais e deliveries iniciantes saírem do chutômetro.</p>

                {/* Preço */}
                <div className="my-6">
                  <span className="text-slate-500 text-sm md:text-xs">R$</span>
                  <span className="text-3xl font-bold text-white font-mono">{isAnnual ? '23,90' : '29,90'}</span>
                  <span className="text-slate-500 text-sm md:text-xs font-mono"> / mês</span>
                  {isAnnual && <span className="text-[11px] md:text-[10px] text-emerald-400 block font-mono mt-1">Cobrado anualmente por R$ 286,80</span>}
                </div>

                {/* Recursos */}
                <ul className="space-y-3 pt-6 border-t border-zinc-900 text-sm md:text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Cadastro de <strong>1 Loja/Filial</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Calculadora de Markup Inverso (balcão e iFood básico)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Cadastro de ingredientes básicos e perdas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Fichas técnicas simples de cozinha</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Consulta básica ao assistente Xande IA</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <a 
                  href="https://lucro-facil.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white rounded-xl text-sm md:text-xs font-bold transition-all"
                >
                  Testar Starter Grátis
                </a>
              </div>
            </div>

            {/* PLAN 2: GROWTH (MAIS POPULAR) */}
            <div className="bg-zinc-950 border-2 border-emerald-500 rounded-2xl p-6 flex flex-col justify-between hover:scale-101 transition-all relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[11px] md:text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full border border-emerald-400 tracking-wider">
                MAIS POPULAR / RECOMENDADO
              </span>
              <div>
                <span className="text-[11px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">GROWTH</span>
                <h3 className="text-lg font-bold text-white mt-1">Operações em Rampa</h3>
                <p className="text-sm md:text-xs text-slate-400 mt-2">Para restaurantes em crescimento que buscam inteligência de verdade e conselhos do Xande.</p>

                {/* Preço */}
                <div className="my-6">
                  <span className="text-slate-500 text-sm md:text-xs">R$</span>
                  <span className="text-4xl font-bold text-emerald-400 font-mono">{isAnnual ? '39,90' : '49,90'}</span>
                  <span className="text-slate-500 text-sm md:text-xs font-mono"> / mês</span>
                  {isAnnual && <span className="text-[11px] md:text-[10px] text-emerald-400 block font-mono mt-1">Cobrado anualmente por R$ 478,80</span>}
                </div>

                {/* Recursos */}
                <ul className="space-y-3 pt-6 border-t border-zinc-900 text-sm md:text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Cadastro de até <strong>5 Lojas/Filiais</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Leva tudo do plano Starter e mais:</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Montador automático de Combos Promocionais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Painel Avançado de Business Intelligence (BI)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Engenharia de Cardápio BCG Automatizada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Consultoria completa e avançada do Xande IA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Suporte prioritário via WhatsApp</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <a 
                  href="https://lucro-facil.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-sm md:text-xs font-extrabold transition-all shadow-lg shadow-emerald-500/10"
                >
                  Testar Growth Grátis por 14 Dias
                </a>
              </div>
            </div>

            {/* PLAN 3: PRO */}
            <div className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between hover:scale-101 transition-all relative">
              <div>
                <span className="text-[11px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">PRO</span>
                <h3 className="text-lg font-bold text-white mt-1">Grandes Redes e Franquias</h3>
                <p className="text-sm md:text-xs text-slate-400 mt-2">Para quem tem alta escala e não quer nenhuma barreira operacional.</p>

                {/* Preço */}
                <div className="my-6">
                  <span className="text-slate-500 text-sm md:text-xs">R$</span>
                  <span className="text-3xl font-bold text-white font-mono">{isAnnual ? '47,90' : '59,90'}</span>
                  <span className="text-slate-500 text-sm md:text-xs font-mono"> / mês</span>
                  {isAnnual && <span className="text-[11px] md:text-[10px] text-emerald-400 block font-mono mt-1">Cobrado anualmente por R$ 574,80</span>}
                </div>

                {/* Recursos */}
                <ul className="space-y-3 pt-6 border-t border-zinc-900 text-sm md:text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Lojas e Filiais Ilimitadas</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Leva tudo do plano Growth e mais:</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Acesso para quantos gerentes e funcionários precisar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Acesso antecipado a todas as novas ferramentas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Consultoria VIP e exclusiva do Xande IA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Suporte instantâneo e dedicado por telefone</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <a 
                  href="https://lucro-facil.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white rounded-xl text-sm md:text-xs font-bold transition-all"
                >
                  Testar Pro Grátis
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* QUEBRA DO ÚLTIMO MEDO (MATEMÁTICA PURA) */}
      <section className="py-16 bg-zinc-950 border-y border-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl inline-flex border border-emerald-500/20">
            <Lock className="w-6 h-6 text-emerald-400" />
          </span>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white">
            O Lucro Fácil é de graça se você fizer a matemática básica da cozinha!
          </h3>
          <div className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed space-y-4">
            <p>
              Não pense no Lucro Fácil como mais uma despesa mensal. Ele é o único funcionário que trabalha 24 horas por dia para colocar dinheiro de verdade na sua conta.
            </p>
            <p>
              Se o sistema te ajudar a identificar que o Fator de Correção do frango estava errado em apenas R$ 1,00 por quilo, ou que você estava deixando vazar R$ 2,00 em taxas não calculadas em cada pedido do iFood...
            </p>
            <p>
              Se você fizer apenas <strong className="text-white">15 pedidos de delivery por dia</strong> no mês inteiro, o Lucro Fácil já salvou <strong className="text-emerald-400">R$ 900,00 que iriam direto para o ralo</strong>. Isso paga o plano anual do sistema inteiro e ainda sobra dinheiro para você investir na sua rampa!
            </p>
            <p className="text-[11px] md:text-[10px] text-slate-400 pt-4">
              É por isso que nós não cobramos taxa de cancelamento e nem exigimos fidelidade de contrato. Nós temos tanta certeza do valor que vamos gerar para o seu restaurante que se você não ver o seu lucro crescer na primeira semana, você pode cancelar com um único clique.
            </p>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS DE RAMPA */}
      <section className="py-20 md:py-28 relative bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-emerald-400 font-extrabold uppercase tracking-widest font-mono block mb-2">QUEM JÁ USA</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              O que dizem os lojistas de rampa
            </h2>
            <p className="text-slate-400 text-sm mt-3">Relatos reais de quem bota a mão na massa na cozinha e no salão.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Depoimento 1 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <p className="text-sm md:text-xs text-slate-300 leading-relaxed italic">
                "Eu vendia quase R$ 45 mil por mês no iFood e vivia com a conta zerada. Achava que o problema era o aplicativo, mas quando usei a calculadora do Lucro Fácil, vi que estava errando o preço do meu combo por R$ 6,00 de diferença! Ajustei o preço pelo Markup Inverso e, já no primeiro mês, sobraram R$ 4.200 líquidos a mais na minha conta."
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-900 pt-4">
                <div className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center font-bold text-xs text-emerald-400 border border-zinc-800">
                  RC
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-xs text-white">Rodrigo Carvalho</h4>
                  <p className="text-[11px] md:text-[10px] text-slate-500">Dono do Burger & Cia – Delivery</p>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <p className="text-sm md:text-xs text-slate-300 leading-relaxed italic">
                "Fazer ficha técnica de restaurante de quilo era um inferno, ninguém tem tempo de pesar 30 pratos todo dia. Com o Módulo de Buffet por Média de Equilíbrio, eu só coloco a proporção de comida leve e pesada e as perdas de cuba. O sistema me deu o preço exato do quilo para cobrir a alta da carne bovina. Prático e sem frescura!"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-900 pt-4">
                <div className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center font-bold text-xs text-emerald-400 border border-zinc-800">
                  MS
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-xs text-white">Mariana Santos</h4>
                  <p className="text-[11px] md:text-[10px] text-slate-500">Restaurante Sabores do Sul – Self-Service</p>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
              <p className="text-sm md:text-xs text-slate-300 leading-relaxed italic">
                "O Xande IA salvou meu estoque. Perguntei para ele como criar um combo para girar uma marca de queijo que estava parando, e ele me deu a receita exata do combo em segundos, sem queimar minha margem. Abandonei de vez as planilhas chatas."
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-900 pt-4">
                <div className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center font-bold text-xs text-emerald-400 border border-zinc-800">
                  AO
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-xs text-white">Alexandre Oliveira</h4>
                  <p className="text-[11px] md:text-[10px] text-slate-500">Pizzaria Bella Itália – Salão e Delivery</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DÚVIDAS FREQUENTES */}
      <section id="faq" className="py-20 md:py-28 bg-zinc-950 relative border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs text-emerald-400 font-extrabold uppercase tracking-widest font-mono block mb-2">FAQ DE CONFIANÇA</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Tudo o que você precisa saber sobre o Lucro Fácil
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm md:text-xs text-slate-300 leading-relaxed border-t border-zinc-900">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-zinc-950 border-t border-zinc-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl inline-block mb-6 border border-emerald-500/20">
            <ShieldCheck className="w-7 h-7 animate-pulse text-emerald-400" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white leading-tight max-w-3xl mx-auto">
            Proteja as margens do seu restaurante hoje mesmo
          </h2>
          <p className="text-sm md:text-xs text-slate-400 max-w-xl mx-auto leading-relaxed mt-4">
            Substitua a adivinhação do caixa por regras rígidas de Markup Inverso e consultoria de IA em milissegundos. Pare de pagar taxas de marketplaces com o seu esforço.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="https://lucro-facil.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 flex items-center justify-center gap-2 group cursor-pointer"
            >
              🔐 QUERO BLINDAR MEU CAIXA AGORA
            </a>
          </div>

          <div className="mt-6 flex justify-center items-center gap-4 text-[11px] md:text-[10px] text-slate-500 font-mono">
            <span>Teste de 14 dias sem compromisso</span>
            <span>•</span>
            <span>Cancele a qualquer momento</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-slate-500 text-sm md:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-emerald-500/5 border border-emerald-500/20 relative w-9 h-9">
              <Shield className="w-5 h-5 text-emerald-400" />
              <Coins className="w-3 h-3 text-emerald-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="font-display font-bold text-white">Lucro Fácil</span>
          </div>
          <p className="text-center md:text-right text-[12px] md:text-[11px] leading-relaxed">
            Lucro Fácil &copy; 2026 Lucro Fácil SaaS Ltda. Todos os direitos reservados. <br />
            A plataforma definitiva de engenharia de cardápio e precificação inteligente que blinda as margens e garante lucro real no caixa.
          </p>
        </div>
      </footer>

    </div>
  );
}
