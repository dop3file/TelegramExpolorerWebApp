import { useState } from 'react';
import WebApp from '@twa-dev/sdk';
import './App.css';

// Моковые данные для поиска (замените на реальные данные)
const mockData = [
  { id: 1, title: 'React документация', description: 'Официальная документация по React', url: 'https://react.dev' },
  { id: 2, title: 'Telegram WebApp', description: 'Документация Telegram Web Applications', url: 'https://core.telegram.org/bots/webapps' },
  { id: 3, title: 'TypeScript Handbook', description: 'Руководство по TypeScript', url: 'https://www.typescriptlang.org/docs' },
  { id: 4, title: 'GitHub', description: 'Крупнейший хостинг для IT-проектов', url: 'https://github.com' },
  { id: 5, title: 'MDN Web Docs', description: 'Ресурс для веб-разработчиков', url: 'https://developer.mozilla.org' },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<typeof mockData>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Имитация задержки поиска
    setTimeout(() => {
      const filtered = mockData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsSearching(false);
      
      // Показываем основную кнопку после поиска
      WebApp.MainButton.setText('Готово').show();
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <h1>Telegram Поисковик</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите запрос..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          {isSearching ? 'Ищем...' : 'Найти'}
        </button>
      </div>

      <div className="results-container">
        {isSearching ? (
          <div className="loader">Загрузка...</div>
        ) : results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="result-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="result-link"
              >
                Перейти
              </a>
            </div>
          ))
        ) : searchQuery ? (
          <p className="no-results">Ничего не найдено</p>
        ) : (
          <p className="start-search">Введите запрос для поиска</p>
        )}
      </div>
    </div>
  );
}

export default App;