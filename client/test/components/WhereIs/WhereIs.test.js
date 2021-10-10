import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from '@jest/globals';
import WhereIs from '../../../src/components/WhereIs/WhereIs';

describe('WhereIs', () => {
    let showWhereIs = true;

    beforeEach(() => {
        fetch.resetMocks();
        render(<WhereIs closeWhereIs={() => {return !showWhereIs}}/>);
    });

    it('opens the WhereIs Modal', () => {
        const collapse = screen.getByRole('textbox');
        expect(collapse.classList.contains('value')).toBeFalsy();

    });
});
