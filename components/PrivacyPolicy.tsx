import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <p className="text-sm text-gray-400">最終更新日: 2024年7月1日</p>

      <h3 className="font-bold text-lg text-on-surface">1. はじめに</h3>
      <p>
        Hameln Reading Stats (以下、「当サービス」といいます)
        は、お客様のプライバシー保護を重視し、本プライバシーポリシー
        (以下、「本ポリシー」といいます)
        を定めています。当サービスは、お客様の情報をサーバーに保存することなく、すべての処理がお客様のブラウザ内で完結する設計になっています。
      </p>

      <h3 className="font-bold text-lg text-on-surface">
        2. 収集する情報とその目的
      </h3>
      <p>
        当サービスは、以下の情報を収集・利用しますが、これらはすべてお客様のブラウザ内にのみ保存されます。
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>
          <strong>ハーメルンアカウント情報 (ユーザーID, パスワード):</strong>{" "}
          読書データAPIへの認証トークンを取得する目的でのみ、認証時に一時的に使用されます。この情報は当サービスには一切保存されず、認証完了後はメモリ上からも破棄されます。
        </li>
        <li>
          <strong>認証トークン:</strong>{" "}
          読書データAPIから取得したアクセストークンです。ログイン状態を維持し、読書データを取得するために、お客様のブラウザの
          `localStorage` に保存されます。
        </li>
        <li>
          <strong>読書データ:</strong>{" "}
          読書作品数、文字数等の統計データです。サービスの表示とパフォーマンス向上のため、お客様のブラウザの
          `localStorage` にキャッシュされます。
        </li>
        <li>
          <strong>アプリケーション設定情報:</strong>{" "}
          月間読書目標など、お客様が当サービス内で設定した情報です。設定を維持するため、お客様のブラウザの
          `localStorage` に保存されます。
        </li>
      </ul>
      <p className="mt-2">
        これらの情報は、読書データの可視化、実績の判定、レベル計算、パーソナライズされたインサイトの提供など、当サービスのコア機能を提供するために利用されます。
      </p>

      <h3 className="font-bold text-lg text-on-surface">3. 広告配信について</h3>
      <p>
        当サービスは、第三者配信の広告サービス「Google
        AdSense」を利用しています。
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>
          広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
        </li>
        <li>
          これには、当サービスや他のサイトへのアクセスに関する情報が含まれますが、氏名、住所、メールアドレス、電話番号といった個人を特定する情報は含まれません。
        </li>
        <li>
          ユーザーは、
          <a
            href="https://adssettings.google.com/authenticated"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Googleの広告設定
          </a>
          から、パーソナライズ広告を無効にすることができます。
        </li>
      </ul>

      <h3 className="font-bold text-lg text-on-surface">
        4. アクセス解析ツールについて
      </h3>
      <p>
        当サービスは、サービスの利用状況の把握と品質向上のため「Google
        Analytics」を利用しています。Google
        Analyticsは、Cookieを利用してお客様のトラフィックデータを匿名で収集します。この機能は、お使いのブラウザ設定でCookieを無効にすることで収集を拒否できます。詳細は
        <a
          href="https://policies.google.com/technologies/partner-sites?hl=ja"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Googleのポリシーと規約
        </a>
        ページをご覧ください。
      </p>

      <h3 className="font-bold text-lg text-on-surface">
        5. データの第三者提供
      </h3>
      <p>
        当サービスは、法令に基づく場合を除き、お客様の情報を第三者に提供することはありません。収集するすべての情報は、お客様のブラウザ内で処理が完結し、外部の第三者サーバー（Google
        Analytics及びGoogle AdSenseを除く）へ送信されることはありません。
      </p>

      <h3 className="font-bold text-lg text-on-surface">
        6. データの管理と削除
      </h3>
      <p>
        認証トークン、キャッシュされた読書データ、設定はすべてお客様のブラウザの
        `localStorage`
        に保存されます。これらの情報は、お客様が当サービスからログアウトするか、ブラウザの閲覧履歴データ（キャッシュやCookieなど）を消去することで、お客様自身で完全に削除することができます。
      </p>

      <h3 className="font-bold text-lg text-on-surface">7. 免責事項</h3>
      <p>
        当サービスは、連携先のAPIから提供されるデータの正確性を保証するものではありません。APIの仕様変更や障害により生じたいかなる損害についても、当サービスの提供者は責任を負いかねます。
      </p>

      <h3 className="font-bold text-lg text-on-surface">
        8. プライバシーポリシーの変更
      </h3>
      <p>
        当サービスは、必要に応じて本ポリシーを変更することがあります。重要な変更があった場合は、ウェブサイト上でお知らせします。
      </p>
    </>
  );
};

export default PrivacyPolicy;
