
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
        当サービスは、以下の情報を収集します。
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>
          <strong>ハーメルンアカウント情報:</strong> お客様が当サービスにログインする際に入力されたハーメルンのユーザーIDおよびパスワード。これらの情報は、読書データAPIへの認証トークンを取得するためにのみ使用され、当サービスのサーバーには一切保存されません。
        </li>
        <li>
          <strong>認証トークнン:</strong> 読書データAPIから取得したアクセストークン。このトークンは、お客様の読書データを取得するために必要であり、お客様のブラウザの `sessionStorage` に保存されます。セッションが終了（タブを閉じるなど）すると破棄されます。
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
        <li>サービスの利便性向上およびパフォーマンス改善のため</li>
        <li>サービスの維持、改善、および新しいサービスの開発のため</li>
      </ul>

      <h3 className="font-bold text-lg text-on-surface">4. 情報の第三者提供</h3>
      <p>
       当サービスは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。収集するすべての情報は、お客様のブラウザ内で処理が完結し、外部の第三者サーバーへ送信されることはありません。
      </p>
      
      <h3 className="font-bold text-lg text-on-surface">5. データの保存と管理</h3>
      <p>
        当サービスは、お客様のハーメルンアカウントのパスワードを一切保存しません。認証トークンは `sessionStorage` に、キャッシュされた読書データや設定は `localStorage` に保存され、これらはすべてお客様のブラウザ内に留まります。お客様がログアウトするか、ブラウザのデータを消去することで、これらの情報は削除されます。
      </p>
      
      <h3 className="font-bold text-lg text-on-surface">6. 免責事項</h3>
      <p>
        当サービスは、読書データAPIから提供されるデータの正確性、完全性、または信頼性について一切保証しません。APIの仕様変更や障害により、サービスが正常に機能しなくなる可能性があります。
      </p>
      
      <h3 className="font-bold text-lg text-on-surface">7. プライバシーポリシーの変更</h3>
      <p>
        当サービスは、必要に応じて本ポリシーを変更することがあります。重要な変更があった場合は、ウェブサイト上でお知らせします。
      </p>
    </>
  );
};

export default PrivacyPolicy;
