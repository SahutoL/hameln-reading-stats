import React, { useEffect } from "react";

// AdSenseスクリプトがグローバルなwindowオブジェクトに `adsbygoogle` を追加するため、
// TypeScriptでその存在を宣言します。
declare global {
  interface Window {
    adsbygoogle: any;
  }
}

interface AdsenseProps {
  // 広告クライアントID (例: 'ca-pub-xxxxxxxxxxxxxxxx')
  client: string;
  // 広告スロットID
  slot: string;
  // インラインスタイル
  style?: React.CSSProperties;
  // 広告フォーマット ('auto', 'rectangle', 'vertical', etc.)
  format?: string;
  // レスポンシブ広告にするかどうかのフラグ
  responsive?: string;
}

const AdsenseComponent: React.FC<AdsenseProps> = ({
  client,
  slot,
  style = { display: "block", textAlign: "center" },
  format = "auto",
  responsive = "true",
}) => {
  useEffect(() => {
    // コンポーネントがマウントされた後に広告リクエストをプッシュします。
    // これにより、SPAでのページ遷移後などでも広告が正しく読み込まれます。
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense execution error:", e);
    }
  }, []);

  // AdSenseの審査に合格した有効な広告スロットIDがない場合、このコンポーネントは表示されません。
  if (!client || !slot) {
    return null;
  }

  return (
    <div className="w-full my-6">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
};

export default AdsenseComponent;
