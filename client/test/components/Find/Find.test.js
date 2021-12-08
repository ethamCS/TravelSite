import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Find from '../../../src/components/Find/Find';

describe('Find', () => {
    let showFind = true;

    test('opens the Find Collapse', () => {
        render(<Find closeFind={() => { return !showFind }} />);
        const collapse = screen.getByRole('searchbox');
        expect(collapse.classList.contains('value')).toBeFalsy();

    });

    test('pass valid find string', () => {
        render(<Find />)
        const findText = screen.getByTestId("find-input");
        fireEvent.change(findText, { target: { value: 'Boise' } })
        expect(findText.value).toEqual("Boise");
    })

    test(' \`Where\` Dropdown Open', ()=>{})

    test('clicks the random button', () => {
        render(<Find />);
        const randomButton = screen.getByTestId("randomButton");
        user.click(randomButton)

    });

    
});
