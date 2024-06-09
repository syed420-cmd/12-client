interface SectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle = ({ title, description }: SectionTitleProps) => {
  return (
    <div className="space-y-2.5 mb-5 lg:mb-10">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default SectionTitle;
