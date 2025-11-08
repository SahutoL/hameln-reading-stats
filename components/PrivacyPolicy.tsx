
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <p className="text-sm text-gray-400">最終更新日: {new Date().toLocaleDateString('ja-JP')}</p>
      
      <h3 className="font-bold text-lg text-on-surface">1. はじめに</h3>
      <p>
        Hameln Reading Stats (以下、「当サービス」といいます) は、お客様の個人情報の保護を最も重要な責務の一つと認識し、このプライバシーポリシー (以下、「本ポリシー」といいます) を定めます。本ポリシーは、当サービスがどのような情報を収集し、それをどのように利用・管理するかを説明するものです。
      </p>

      <h3 className="font-bold text-lg text-on-surface">2. 収集する情報</h3>
      <p>
        当サービスは、以下の情報を収集しますが、これらはお客様のブラウザ内にのみ保存され、当サービスのサーバーには送信・保存されません。
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>
          <strong>ハーメルンアカウント情報:</strong> お客様が当サービスにログインする際に入力されたハーメルンのユーザーIDおよびパスワード。これらの情報は、読書データAPIへの認証トークンを取得するためにのみ使用され、認証完了後はメモリ上からも破棄されます。
        </li>
        <li>
          <strong>認証トークン:</strong> 読書データAPIから取得したアクセストークン。このトークンは、お客様の読書データを取得するために必要であり、お客様のブラウザの `localStorage` に保存されます。お客様がログアウトするまで保持され、ログイン状態を維持するために使用されます。
        </li>
        <li>
          <strong>読書データ:</strong> 読書データAPIを通じて取得した、お客様の読書作品数、話数、文字数などの統計データ。このデータは、パフォーマンス向上のためにお客様のブラウザの `localStorage` にキャッシュされます。
        </li>
        <li>
          <strong>アプリケーション設定情報:</strong> お客様が当サービス内で設定した読書目標など。これらの情報はお客様のブラウザの `localStorage` に保存されます。
        </li>
      </ul>

      <h3 className="font-bold text-lg text-on-surface">3. 情報の利用目的</h3>
      <p>
        当サービスは、収集した情報を以下の目的で利用します。
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>お客様の読書データを取得し、統計情報として可視化・表示するため</li>
        <li>ログイン状態を維持し、サービスの利便性を向上させるため</li>
        <li>サービスのパフォーマンスを改善するため</li>
        <li>サービスの維持、改善、および新しいサービスの開発のため</li>
      </ul>

      <h3 className="font-bold text-lg text-on-surface">4. 情報の第三者提供</h3>
      <p>
       当サービスは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。収集するすべての情報は、お客様のブラウザ内で処理が完結し、外部の第三者サーバーへ送信されることはありません。（アクセス解析ツールについては第8条をご参照ください）。
      </p>
      
      <h3 className="font-bold text-lg text-on-surface">5. データの保存と管理</h3>
      <p>
        当サービスは、お客様のハーメルンアカウントのパスワードを一切保存しません。認証トークン、キャッシュされた読書データ、設定はすべてお客様のブラウザの `localStorage` に保存されます。これらの情報はお客様がログアウトするか、ブラウザのデータを消去することで削除されます。
      </p>
      
      <h3 className="font-bold text-lg text-on-surface">6. 免責事項</h3>
      <p>
        当サービスは、読書データAPIから提供されるデータの正確性、完全性、または信頼性について一切保証しません。APIの仕様変更や障害により、サービスが正常に機能しなくなる可能性があります。
      </p>
      
      <h3 className="font-bold text-lg text-on-surface">7. プライバシーポリシーの変更</h3>
      <p>
        当サービスは、必要に応じて本ポリシーを変更することがあります。重要な変更があった場合は、ウェブサイト上でお知らせします。
      </p>

      <h3 className="font-bold text-lg text-on-surface">8. アクセス解析ツールについて</h3>
      <p>
        当サービスは、サービスの利用状況を把握し、品質向上を図るためにGoogle社の提供する「Google Analytics」を利用しています。Google Analyticsは、Cookieを利用してお客様のトラフィックデータを収集しますが、これらは匿名で収集されており、個人を特定するものではありません。
      </p>
      <p>
        この機能は、お使いのブラウザの設定でCookieを無効にすることで収集を拒否することができます。Google Analyticsの利用規約およびプライバシーポリシーに関する詳細は、以下のページをご参照ください。
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
        <li><a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics利用規約</a></li>
        <li><a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Googleプライバシーポリシー</a></li>
        <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analyticsオプトアウトアドオン</a></li>
      </ul>
    </>
  );
};

export default PrivacyPolicy;