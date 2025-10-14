import { Heading, HeadingProps } from '@radix-ui/themes';

interface PageTitleProps extends HeadingProps {
  title: string;
}

export function PageTitle(props: PageTitleProps) {
  const { title, ...headingProps } = props;
  return (
    <Heading className="text-2xl font-bold" {...headingProps}>
      {title}
    </Heading>
  );
}
