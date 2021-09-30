import React from 'react';
import { render, screen } from '@testing-library/react';
import Planner from '../../../src/components/Trip/Planner';
import { MOCK_PLACES } from "../../sharedMocks";

describe('Planner', () => {
    const createSnackBar = jest.fn();
    const places = MOCK_PLACES;

    beforeEach(() => {
        render(<Planner createSnackBar={createSnackBar} places={MOCK_PLACES} placesActions={createSnackBar} />);
    });

    it('renders a Leaflet map', async () => {
        screen.getByText('Leaflet');
    });

    it('renders trip table', async () => {
        screen.getByText('My Trip');
    });
});