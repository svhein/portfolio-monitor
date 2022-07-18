import React from 'react';
import '@testing-library/jest-dom'
import {getByTestId, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Trade from './Trade'

describe('Trade', () => {

    test('open buy-form when when buy-button is pressed', async () => {

        render(<Trade />)
        const buyButton = screen.getByTestId('trade-buy-button');

        userEvent.click(buyButton);

        await waitFor(() => {
            expect(screen.getByTestId('buy-form')).toBeInTheDocument()
          })
    })

})

