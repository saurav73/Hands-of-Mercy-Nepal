/**
 * Application root: BrowserRouter wrapped in the LanguageProvider, with
 * PageLayout (navbar + footer chrome) around every route and a catch-all
 * NotFoundPage for unknown URLs.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EducationPage } from './pages/EducationPage';
import { ImpactPage } from './pages/ImpactPage';
import { StoriesPage } from './pages/StoriesPage';
import { GalleryPage } from './pages/GalleryPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
