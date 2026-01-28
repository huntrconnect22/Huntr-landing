import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, ShoppingCart, Workflow } from "lucide-react";

const solutions = [
  {
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    title: "E-Procurement Systems",
    description: "Streamline your purchasing process with our intuitive e-procurement platform. Gain control over spending and improve efficiency.",
  },
  {
    icon: <Workflow className="h-8 w-8 text-primary" />,
    title: "E-Supply Chain Management",
    description: "Optimize your entire supply chain, from sourcing to delivery, with our integrated, cloud-based management system.",
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary" />,
    title: "Cloud-Based Solutions",
    description: "Access our powerful tools anytime, anywhere. Our secure cloud infrastructure ensures reliability and scalability for your business.",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">Comprehensive Supply Chain Solutions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We provide a fast, secure, and well-structured supply chain ecosystem designed for the modern enterprise.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="items-center">
                {solution.icon}
                <CardTitle className="mt-4 font-headline">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
