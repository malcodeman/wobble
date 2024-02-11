import { Stage } from "@pixi/react";
import { useMeasure } from "@react-hookz/web";
import { useRouter } from "next/navigation";
import { useProjects } from "@/app/hooks/useProjects";
import Shape from "@/app/components/Shape";
import { onDraw } from "@/app/utils";
import { Button } from "@/app/ui/Button";
import { Template as TemplateType } from "@/app/types";

const Template = (props: TemplateType) => {
  const { title, shapes } = props;
  const [measurements, ref] = useMeasure<HTMLDivElement>();
  const { newProject } = useProjects();
  const router = useRouter();

  const handleUseTemplate = () => {
    const project = newProject({ title, shapes });

    router.push(`/projects/${project?.id}`);
  };

  return (
    <div ref={ref}>
      {measurements ? (
        <Stage
          width={measurements.width}
          height={measurements.width}
          options={{ backgroundColor: 0xfcfcfd }}
          className="mb-2 rounded-md"
        >
          {shapes.map((shape, index) => (
            <Shape
              key={index}
              draw={(g) => onDraw(g, shape)}
              x={shape.x}
              y={shape.y}
              scale={shape.scale}
            />
          ))}
        </Stage>
      ) : null}
      <div className="flex items-center justify-between">
        <div className="text-white">{title}</div>
        <Button onClick={handleUseTemplate} data-testid="use-template-button">
          Use template
        </Button>
      </div>
    </div>
  );
};

export default Template;
