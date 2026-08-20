import { useEffect, useState } from "react";
import PageHeader from "./components/PageHeader.jsx";
import ArticleList from "./components/ArticleList.jsx";
import LoadingMessage from "./components/LoadingMessage.jsx";
import { fetchRecentArticles } from "./api/articles.js";
import "./App.css";

/**
 * App — racine du back-office.
 * Rôle : charger les articles (API), gérer loading/erreur, passer des props aux enfants.
 */
function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchRecentArticles();
        setArticles(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Impossible de joindre l'API.");
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  function handleEdit(id) {
    console.log("Modifier l'article id =", id);
  }

  function handleDelete(id) {
    console.log("Supprimer l'article id =", id);
  }

  return (
    <div className="app">
      <PageHeader title="Back-office - Blog Java" />
      <main>
        {isLoading && <LoadingMessage />}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && (
          <ArticleList
            articles={articles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
