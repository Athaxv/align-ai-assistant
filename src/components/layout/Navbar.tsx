import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from '../ui/Container';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Monitoring', href: '#features' },
    { label: 'AI Detection', href: '#ai-detection' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'FAQ', href: '#faq' },
  ];
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center space-x-2 select-none"
            aria-label="PostTracker"
          >
            <div className="relative h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-400 opacity-80"></div>
              <span className="relative font-bold text-white text-lg">A</span>
            </div>
            <span className="font-semibold text-lg">Arogyam</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={() => navigate('/signup')} variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Request Demo</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            'md:hidden fixed inset-0 top-16 bg-white z-40 transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="px-4 pt-4 pb-6 space-y-1">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" className="w-full justify-center">
                Sign In
              </Button>
              <Button className="w-full justify-center">Request Demo</Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
