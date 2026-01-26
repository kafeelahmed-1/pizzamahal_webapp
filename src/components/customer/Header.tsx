import { ShoppingCart, Pizza, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const { itemCount, toggleCart, total } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur-md border-b border-border shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary group-hover:scale-110 transition-transform duration-300">
            <Pizza className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-gradient text-shadow group-hover:text-primary transition-colors duration-300">
              Pizza Mahal
            </h1>
            <p className="text-xs text-muted-foreground">Royal Taste, Fresh & Delicious</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Menu
          </Link>
          <Link
            to="/admin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background animate-pulse">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Cart Button */}
        <button
          onClick={toggleCart}
          className="hidden md:flex relative items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-medium">
            Rs. {total.toFixed(0)}
          </span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background animate-pulse">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md">
          <nav className="container px-4 py-4 space-y-4">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 py-2"
            >
              🍕 Menu
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-extrabold text-gradient text-shadow hover:scale-105 transition-all duration-300 py-2 border border-primary/20 rounded-lg bg-primary/5 hover:bg-primary/10"
            >
              🔐 Admin Panel
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
