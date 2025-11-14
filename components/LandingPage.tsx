import React from 'react';
import { LogoIcon, ChartBarIcon, BadgeCheckIcon, KeyIcon, ShareIcon, TargetIcon, CalendarIcon } from './icons';

interface LandingPageProps {
  onStart: () => void;
  onOpenModal: (content: 'terms' | 'privacy') => void;
}

const Feature: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex flex-col items-center text-center p-6 bg-surface-glass backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 h-full">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-on-surface">{title}</h3>
    <p className="text-gray-400 text-sm">{children}</p>
  </div>
);

const FAQItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-700/50 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-on-surface"
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <p className="text-gray-400">{children}</p>
      </div>
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onOpenModal }) => {
  return (
    <div className="animate-fade-in flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-24 md:py-32 flex items-center justify-center flex-grow">
        <div className="container mx-auto px-4">
          <LogoIcon className="h-24 w-24 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
            読書の軌跡を、<br className="md:hidden" />最高の物語に。
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            小説投稿サイト「ハーメルン」の読書データを連携し、あなたの読書体験を美しいグラフや統計で可視化します。目標設定や実績機能で、読書をもっと楽しく、もっと豊かに。
          </p>
          <button
            onClick={onStart}
            className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-primary-variant transition-colors shadow-lg shadow-primary/30 transform hover:scale-105 duration-300"
          >
            さっそく始める (無料)
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-on-surface">あなたの読書を、次のレベルへ</h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            ただ読むだけじゃない。自分の読書スタイルを発見し、目標を立て、達成する喜びを体験しましょう。
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature icon={<ChartBarIcon className="w-12 h-12" />} title="読書データの可視化">
              年・月・曜日ごとの読書文字数をグラフで一目で把握。あなたの読書ペースやパターンを深く理解できます。
            </Feature>
            <Feature icon={<BadgeCheckIcon className="w-12 h-12" />} title="実績とレベルシステム">
              読書量に応じてレベルアップし、目標達成で実績を解除。ゲーミフィケーション要素でモチベーションを高めます。
            </Feature>
             <Feature icon={<TargetIcon className="w-12 h-12" />} title="月間目標の設定">
              毎月の読書目標を設定し、進捗をリアルタイムで追跡。目標達成の喜びが、次の読書への意欲を掻き立てます。
            </Feature>
            <Feature icon={<CalendarIcon className="w-12 h-12" />} title="アクティビティカレンダー">
              日々の読書活動をヒートマップで表示。あなたの頑張りが色濃く記録され、継続の励みになります。
            </Feature>
            <Feature icon={<ShareIcon className="w-12 h-12" />} title="レポートカードシェア">
              あなたの読書成果をまとめた美しいカードを生成。SNSで友人や仲間とシェアして、読書の輪を広げましょう。
            </Feature>
            <Feature icon={<KeyIcon className="w-12 h-12" />} title="安全なデータ連携">
              ハーメルンのパスワードは保存されません。あなたのデータはあなたのブラウザの中にだけ。安心してご利用ください。
            </Feature>
          </div>
        </div>
      </section>
      
       {/* How it works Section */}
       <section className="py-20">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-center mb-12 text-on-surface">簡単3ステップで開始</h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative max-w-4xl mx-auto">
                {/* Dashed line connecting steps - for larger screens */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-700/70" style={{transform: 'translateY(-50%)', zIndex: 0}}></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white mb-4 border-4 border-background">1</div>
                    <h3 className="font-bold text-xl mb-2">ログイン</h3>
                    <p className="text-sm text-gray-400">お使いのハーメルンアカウントで安全にログインします。</p>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white mb-4 border-4 border-background">2</div>
                    <h3 className="font-bold text-xl mb-2">データ連携</h3>
                    <p className="text-sm text-gray-400">あなたの読書データが自動で取得され、美しいダッシュボードに変換されます。</p>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white mb-4 border-4 border-background">3</div>
                    <h3 className="font-bold text-xl mb-2">分析と共有</h3>
                    <p className="text-sm text-gray-400">あなたの読書傾向を発見し、成果を仲間とシェアしましょう。</p>
                </div>
            </div>
         </div>
       </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-on-surface">よくある質問</h2>
          <FAQItem question="本当に無料ですか？">
            はい、すべての機能を完全無料でご利用いただけます。当サービスは、ページ内に表示されるアフィリエイトリンクからの収益によって運営されています。
          </FAQItem>
          <FAQItem question="パスワードを入力するのが不安です。">
            ご安心ください。入力されたパスワードは、ハーメルンの認証にのみ使用され、当サービスには一切保存されません。通信は暗号化されており、セキュリティは最優先で考慮されています。あなたのデータは、あなたのブラウザの中にのみ保存されます。
          </FAQItem>
          <FAQItem question="読書データは他の人に見られますか？">
            いいえ。あなたの読書データはあなたのブラウザ内にのみ保存され、あなたがレポートカードのシェア機能を使わない限り、他の誰にも見られることはありません。プライバシーは完全に保護されています。
          </FAQItem>
           <FAQItem question="データはどのくらいの頻度で更新されますか？">
            連携先のAPIの仕様上、読書データは約3日前のものまでが反映されます。当サービスでは、この仕様を考慮して連続読書日数などを計算しています。データの再取得は、ログイン時や必要に応じて手動で行うことができます。
          </FAQItem>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full bg-transparent py-8 mt-auto border-t border-white/10">
          <div className="container mx-auto text-center text-gray-500 text-sm">
              <div className="flex items-center justify-center gap-3 mb-4">
                  <LogoIcon className="h-7 w-7 text-gray-500"/>
                  <span className="font-bold text-lg text-gray-400">Hameln Reading Stats</span>
              </div>
              <p>&copy; {new Date().getFullYear()} Hameln Reading Stats. All Rights Reserved.</p>
              <div className="mt-4 space-x-4">
                  <button onClick={() => onOpenModal('terms')} className="hover:text-primary transition-colors">利用規約</button>
                  <span>|</span>
                  <button onClick={() => onOpenModal('privacy')} className="hover:text-primary transition-colors">プライバシーポリシー</button>
                  <span>|</span>
                  <a href="https://www.youware.com/?via=greef" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-primary transition-colors">おすすめツール</a>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;