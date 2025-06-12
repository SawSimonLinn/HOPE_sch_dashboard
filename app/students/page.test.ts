import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page functionality related to students', () => {
    it('renders the page correctly', () => {
        render(<Page />);
        const heading = screen.getByText(/students/i);
        expect(heading).toBeInTheDocument();
    });
});