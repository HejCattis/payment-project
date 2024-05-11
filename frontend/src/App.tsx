import { useState } from 'react';
import PaymentMethodSelector from './payment/PaymentMethodSelector';
import { DefaultService } from '../../lib/generated-client';

function App() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (paymentMethodId: string): Promise<void> => {
        try {
            const fakeData = {
                paymentMethodId,
                productId: '123xxx'
            };
            await DefaultService.createPayment(fakeData);
            console.log('Payment successful');
        } catch (error) {
            console.error(error);
            setError('Något gick fel.');
            return;
        }
    };

    return (
        <section className="relative flex h-full min-h-screen flex-col justify-between gap-6 bg-blue-50">
            <section className="mt-10">
                <div className="mx-auto flex max-w-md flex-col justify-center gap-4 rounded-lg bg-white p-4">
                    <h2 className="font-semibold ">Exempel på betalning</h2>
                    <PaymentMethodSelector
                        errorMessage={error}
                        submitText="Betala"
                        handleSubmit={handleSubmit}
                        onError={(error: string) => setError(error)}
                    />
                </div>
            </section>
        </section>
    );
}

export default App;
