
const DisplayPrice = ({
    margin = '2',
}: {
    margin?: '0' | '2' | '4';
}) => {
    return (
                <div className={`mt-${margin}`}>
                    <div className='flex justify-between'>
                        <p className="">Pris</p>
                        <p className="font-semibold">
                            9 kr/mån
                        </p>
                    </div>
                    <p className='text-sm text-gray-500 text-right'>inkl. moms</p>
                </div>

    );
};
export default DisplayPrice;
