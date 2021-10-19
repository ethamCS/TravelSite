import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { beforeEach, describe, it } from '@jest/globals';
import { EditTripName } from '../../../src/components/Trip/Itinerary/TripName';

describe('TripName', () => {
    beforeEach(() => {
        render(<EditTripName/>);
    });
    it('renders original trip name', async () => {
        screen.getByText('My Trip');
    });
});