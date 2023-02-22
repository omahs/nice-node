// This component could be made into a Generic "FullScreenStepper" component
// Just make sure to always render each child so that children component state isn't cleard
import { useCallback, useState } from 'react';

import { SelectOption } from '../../Generics/redesign/SpecialSelect/SpecialSelect';
import { ModalConfig } from '../ModalManager/modalUtils';
import ContentWithSideArt from '../../Generics/redesign/ContentWithSideArt/ContentWithSideArt';
import { componentContainer, container } from './addNodeStepper.css';
import AddEthereumNode, {
  AddEthereumNodeValues,
} from '../AddEthereumNode/AddEthereumNode';
import DockerInstallation from '../DockerInstallation/DockerInstallation';

import step1 from '../../assets/images/artwork/NN-Onboarding-Artwork-01.png';
import step3 from '../../assets/images/artwork/NN-Onboarding-Artwork-03.png';

export interface AddNodeStepperModalProps {
  modal?: boolean;
  modalOnChangeConfig: (config: ModalConfig, save?: boolean) => void;
  step: number;
  disableSaveButton: (value: boolean) => void;
}

const AddNodeStepperModal = ({
  modal = false,
  modalOnChangeConfig,
  step,
  disableSaveButton,
}: AddNodeStepperModalProps) => {
  const [sEthereumNodeConfig, setEthereumNodeConfig] =
    useState<AddEthereumNodeValues>();

  const setConsensusClient = (
    clClient: SelectOption,
    ethereumNodeConfig: AddEthereumNodeValues
  ) => {
    const config = { ...ethereumNodeConfig, consensusClient: clClient };
    modalOnChangeConfig({
      consensusClient: clClient.value,
    });
    setEthereumNodeConfig(config);
  };

  const setExecutionClient = (
    elClient: SelectOption,
    ethereumNodeConfig: AddEthereumNodeValues
  ) => {
    const config = { ...ethereumNodeConfig, executionClient: elClient };
    modalOnChangeConfig({
      executionClient: elClient.value,
    });
    setEthereumNodeConfig(config);
  };

  const onChangeDockerInstall = useCallback((newValue: string) => {
    console.log('onChangeDockerInstall newValue ', newValue);
    if (newValue === 'done') {
      disableSaveButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStepScreen = () => {
    let stepScreen = null;
    let stepImage = step1;
    switch (step) {
      case 0:
        stepScreen = (
          <AddEthereumNode
            ethereumNodeConfig={sEthereumNodeConfig}
            setConsensusClient={setConsensusClient}
            setExecutionClient={setExecutionClient}
            modalOnChangeConfig={modalOnChangeConfig}
          />
        );
        stepImage = step1;
        break;
      case 1:
        stepScreen = (
          <DockerInstallation
            disableSaveButton={disableSaveButton}
            onChange={onChangeDockerInstall}
            type="modal"
          />
        );
        stepImage = step3;
        break;
      default:
    }

    return (
      <div style={{ height: '100%' }}>
        <ContentWithSideArt modal={modal} graphic={stepImage}>
          {stepScreen}
        </ContentWithSideArt>
      </div>
    );
  };

  const modalStyle = modal ? 'modal' : '';

  return (
    <div className={[container, modalStyle].join(' ')}>
      <div className={componentContainer}>{getStepScreen()}</div>
    </div>
  );
};

export default AddNodeStepperModal;