
import React, { useState } from 'react';
import { hamelnApiService } from '../services/hamelnApiService';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { UserIcon, LockIcon, InformationCircleIcon } from './icons';

interface LoginProps {
  onLoginSuccess: (token: string) => void;
  onOpenModal: (content: 'terms' | 'privacy') => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onOpenModal }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await hamelnApiService.login(userId, password);
      onLoginSuccess(data.access_token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-xl shadow-lg border border-gray-700">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-on-surface">
            ハーメルンアカウントにログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            ハーメルンの読書データを表示します
          </p>
        </div>
        {error && <ErrorMessage message={error} />}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
               </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-md relative block w-full pl-10 px-3 py-3 border border-gray-600 bg-gray-800 text-on-surface placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="ユーザーID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon className="h-5 w-5 text-gray-400" />
               </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full pl-10 px-3 py-3 border border-gray-600 bg-gray-800 text-on-surface placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 p-3 bg-surface-glass border border-blue-500/50 rounded-md text-sm text-gray-300">
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                    <h3 className="font-medium text-blue-300">情報の取り扱いについて</h3>
                    <div className="mt-2 text-xs text-gray-400">
                        <ul className="list-disc list-inside space-y-1">
                            <li>ユーザーIDとパスワードは、読書データAPIの認証にのみ使用され、本サービスには保存されません。</li>
                            <li>認証情報はAPIサーバーに直接送信されます。</li>
                            <li>取得した認証トークンは、セッション中のみブラウザに保存され、タブを閉じると破棄されます。</li>
                        </ul>
                    </div>
                </div>
            </div>
          </div>


          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-variant hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-variant disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <Spinner /> : 'ログイン'}
            </button>
          </div>
        </form>
         <p className="mt-4 text-center text-xs text-gray-500">
            ログインすることで、
            <button onClick={() => onOpenModal('terms')} className="font-medium text-primary hover:underline">利用規約</button>
            および
            <button onClick={() => onOpenModal('privacy')} className="font-medium text-primary hover:underline">プライバシーポリシー</button>
            に同意したものとみなされます。
        </p>
      </div>
    </div>
  );
};

export default Login;
