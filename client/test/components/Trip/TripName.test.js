import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { beforeEach, describe, it } from '@jest/globals';
import { EditTripName } from '../../../src/components/Trip/Itinerary/TripName';

describe('TripName', () => {
    beforeEach(() => {
        render(<EditTripName/>);
    });

    it('renders original trip name', () => {
        screen.getByText('My Trip');
    });

    it('renders text box', async () =>{
        const collapse = screen.getByTestId('trip-collapse');
        expect(collapse.classList.contains('show')).toBe(false);
        
        const editbutton = screen.getByTestId('edit-button');
        user.click(editbutton);
        await waitFor(() => {
            expect(collapse.classList.contains('show')).toBe(true);
        });
    });
});