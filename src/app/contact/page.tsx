import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
    return (
        <div className="max-w-xl mx-auto px-6 py-24">
            <h1 className="text-3xl font-bold mb-8 text-swiss-charcoal">Contact</h1>
            <ContactForm />
        </div>
    );
}
