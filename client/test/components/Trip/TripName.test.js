import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { beforeEach, describe } from '@jest/globals';
import { EditTripName } from '../../../src/components/Trip/Itinerary/TripName';

describe('TripName', () => {
    beforeEach(() => {
        render(<EditTripName/>);
    });
});