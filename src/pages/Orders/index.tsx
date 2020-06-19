import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { useShared } from '../../hooks/shared';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  thumbnail_url: string;
}

const Orders: React.FC = () => {
  const { ordersUpdated } = useShared();
  const [orders, setOrders] = useState<Food[]>([]);

  async function loadOrders(): Promise<void> {
    const response = await api.get<Food[]>('orders');

    const ordersFood = response.data.map(
      ({ id, name, description, price, thumbnail_url }) => {
        return {
          id,
          name,
          description,
          price,
          thumbnail_url,
          formattedPrice: formatValue(price),
        };
      },
    );

    setOrders(ordersFood);
  }

  useEffect(() => {
    loadOrders();
  }, [ordersUpdated]);

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedPrice}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
