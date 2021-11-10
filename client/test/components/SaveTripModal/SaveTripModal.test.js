import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from '@jest/globals';
import SaveTripModal from '../../../src/components/SaveTripModal/SaveTripModal';

describe('SaveTripModal', () => {
    beforeEach(() => {
        render(<SaveTripModal isOpen={true}/>);
    });

    it('Renders pop-up', async () =>{
        const modal = screen.getByTestId('save-modal');
        expect(modal.classList.contains('show')).toBe(false);
    });
});