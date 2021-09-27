import React from 'react';
import ButtonMutate from 'modules/common/components/ButtonMutate';
import { IButtonMutateProps } from 'modules/common/types';
import Form from '../../components/unit/Form';
import { mutations, queries } from '../../graphql';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

type Props = {
  unit?: any;
  closeModal: () => void;
};

const FormContainer = (props: Props) => {
  const { data, loading } = useQuery(gql(queries.departments), {
    variables: { parentId: null },
    fetchPolicy: 'network-only'
  });

  if (loading) {
    return <div>...</div>;
  }

  const renderButton = ({
    name,
    values,
    isSubmitted,
    object,
    callback
  }: IButtonMutateProps) => {
    return (
      <ButtonMutate
        mutation={object._id ? mutations.unitsEdit : mutations.unitsAdd}
        refetchQueries={[
          {
            query: gql(queries.units)
          }
        ]}
        variables={values}
        isSubmitted={isSubmitted}
        type="submit"
        callback={callback}
        successMessage={`You successfully ${
          object._id ? 'updated' : 'added'
        } a ${name}`}
      />
    );
  };

  return (
    <Form
      parentDepartments={data.departments}
      {...props}
      renderButton={renderButton}
    />
  );
};

export default FormContainer;
