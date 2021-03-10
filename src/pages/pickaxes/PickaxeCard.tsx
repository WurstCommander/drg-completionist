import {
  Card,
  Checkbox,
  Col,
  Divider,
  Image as AntImage,
  Row,
  Tooltip,
} from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useEffect, useMemo, useState } from 'react';
import { Credit } from 'assets/currencies';
import { Assignment, LostPack } from 'assets/other';
import Image from 'components/Image';
import { Pickaxe } from 'data/pickaxes';

const accentColor = '#dc8c13';
const checkboxOptions = ['Blades', 'Head', 'Shaft', 'Handle', 'Pommel'];

/** These type guards are used to get the fallback PNGs or JPGs for
 *  Ant's Image component, which only accepts strings and not ImgSrc's
 *  union type. (TypeScript is rather unhappy without them.)
 * */
const isPNGSrc = (imgSrc: ImgSrc): imgSrc is PNGSrc => true;
const isJPGSrc = (imgSrc: ImgSrc): imgSrc is JPGSrc => true;
const getFallbackSrc = (imgSrc: ImgSrc) =>
  isPNGSrc(imgSrc) ? imgSrc.png : isJPGSrc(imgSrc) ? imgSrc.jpg : undefined;

export default function PickaxeCard(props: { pickaxe: Pickaxe }) {
  const [checkedParts, setCheckedParts] = useState<CheckboxValueType[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isPartiallyComplete, setIsPartiallyComplete] = useState(false);

  useEffect(() => {
    setIsComplete(checkedParts.length === checkboxOptions.length);
    setIsPartiallyComplete(
      checkedParts.length !== 0 &&
        checkedParts.length !== checkboxOptions.length
    );
  }, [checkedParts]);

  const onChange = (checked: CheckboxValueType[]) => setCheckedParts(checked);

  const onClick = () =>
    setCheckedParts(
      checkedParts.length === checkboxOptions.length
        ? []
        : (checkboxOptions as CheckboxValueType[])
    );

  const iconSrc = useMemo(() => {
    switch (props.pickaxe.source) {
      case 'Assignment':
        return Assignment;
      case 'DLC':
        return Credit;
      case 'Lost Pack':
        return LostPack;
    }
  }, [props.pickaxe.source]);

  return (
    <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={24}>
      <Card
        hoverable
        title={
          <div onClick={onClick}>
            {props.pickaxe.name}
            <Image
              alt={`${props.pickaxe.name} is acquired via ${props.pickaxe.source}`}
              src={iconSrc}
              style={{
                filter: isComplete ? 'grayscale(1) invert(1)' : undefined,
                float: 'right',
                height: 24,
                width: 'auto',
              }}
            />
          </div>
        }
        headStyle={{
          backgroundColor: isComplete ? accentColor : 'inherit',
          color: isComplete ? '#1a1a1a' : '#cccccc',
          fontWeight: 'bold',
          transition: 'all 0.3s',
        }}
        style={
          isPartiallyComplete
            ? {
                outline: `3px solid ${accentColor}`,
              }
            : undefined
        }
      >
        <Row justify="space-between">
          <Col span={11}>
            <Tooltip
              destroyTooltipOnHide
              placement="bottom"
              title={`Obtained via ${props.pickaxe.source}`}
            >
              <AntImage
                alt={props.pickaxe.name}
                src={props.pickaxe.icon.webp}
                fallback={getFallbackSrc(props.pickaxe.icon)}
                style={{
                  border: '2px solid #cccccc',
                  height: 110,
                  width: 'auto',
                }}
              />
            </Tooltip>
          </Col>
          <Col span={2}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col span={11}>
            <Row align="middle" justify="space-between">
              <Checkbox.Group
                onChange={onChange}
                style={{ width: '100%' }}
                value={checkedParts}
              >
                {checkboxOptions.map((option) => (
                  <Col key={option} span={24}>
                    <Checkbox value={option}>{option}</Checkbox>
                  </Col>
                ))}
              </Checkbox.Group>
            </Row>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
