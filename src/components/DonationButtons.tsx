import kofiLogo from '@/assets/icons/kofi-logo.png';
import paypalLogo from '@/assets/icons/paypal-logo.png';

interface DonationButtonsProps {
  variant?: 'dark' | 'light';
}

const DonationButtons = ({ variant = 'dark' }: DonationButtonsProps) => {
  const buttons = [
    {
      title: 'PayPal',
      logo: paypalLogo,
      href: 'https://www.paypal.com/donate/?hosted_button_id=8RQANKNH3TUXQ',
      bg: 'bg-[#3b7bbf]',
    },
    {
      title: 'Ko-Fi',
      logo: kofiLogo,
      href: 'https://ko-fi.com/virtualvoodoodolls',
      bg: 'bg-[#ff5e5b]',
    },
  ];

  if (variant === 'light') {
    return (
      <div className="flex gap-3 justify-center flex-wrap">
        {buttons.map(item => (
          <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer"
            className="no-underline border-[1.5px] border-foreground/[0.14] rounded-sm px-5 py-3 hover:border-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_hsl(var(--ink))] transition-all cursor-pointer flex items-center gap-2">
            <img src={item.logo} alt={item.title} className="w-5 h-5 object-contain" />
            <span className="font-body text-sm font-bold text-ink">{item.title}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {buttons.map(item => (
        <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer"
          className={`no-underline ${item.bg} text-cream font-body text-sm font-bold tracking-[0.12em] uppercase px-10 py-4 rounded-sm hover:brightness-110 transition-all cursor-pointer min-w-[160px] flex items-center justify-center gap-2`}>
          <img src={item.logo} alt={item.title} className="w-5 h-5 object-contain brightness-0 invert" />
          {item.title}
        </a>
      ))}
    </div>
  );
};

export default DonationButtons;
